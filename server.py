from audioop import cross
from flask import Flask
import todoist
import os
from datetime import datetime, timedelta
from dateutil import parser
from flask_cors import CORS, cross_origin

#initialize app
app = Flask(__name__, static_folder='todoist_app/build', static_url_path='')
CORS(app)

def get_habits(api):
    print("getting habits")
    habit_label = list(filter(lambda x: x['name'] == 'Habit', api.labels.all()))[0]
    habits = list(map(lambda x: {'name': x['content'], 'id': x['id']}, list(filter(lambda x: habit_label['id'] in x['labels'], api.items.all()))))

    return habits

@app.route('/')
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, 'App.js')

#Tasks API
@app.route('/habits', methods=['GET'])
@cross_origin()
def habits():
    api_key = os.environ.get('TODOIST_API_KEY')
    api = todoist.TodoistAPI(api_key)
    api.sync()
    habits = get_habits(api)
    return {"tasks": habits}

#Tasks API
@app.route('/task/<task_id>', methods=['GET'])
@cross_origin()
def task(task_id):
    api_key = os.environ.get('TODOIST_API_KEY')
    api = todoist.TodoistAPI(api_key)
    api.sync()
    success_count = []
    logs = []
    page = 10
    for i in range(page):
        logs += api.activity.get(object_type = "item", object_id = task_id, event_type = "completed", page=i)['events']
    completion_dates = [log['event_date'] for log in logs]
    completion_dates = list(map(lambda x: parser.parse(x) , completion_dates))
    completion_dates.sort()

    counts = []
    counter = 1
    for i in range(len(completion_dates)):
        if i == 0:
            pass
        elif completion_dates[i].date() - timedelta(days=1) == completion_dates[i-1].date():
            counter += 1
        else:
            counter = 1
        counts.append(counter)

    result = [{'day': completion_dates[i].strftime('%Y-%m-%d'), 'value': counts[i]} for i in range(len(completion_dates))]
    return {'completion_dates': result}

if __name__ == '__main__':
    app.run(debug=True)