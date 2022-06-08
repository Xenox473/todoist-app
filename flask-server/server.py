from flask import Flask
import todoist
import os

#initialize app
app = Flask(__name__)

def get_habits(api, page=4):
    print("getting habits")
    completed_activities = api.activity.get(event_type = "completed")
    habit_label = list(filter(lambda x: x['name'] == 'Habit', api.labels.all()))[0]
    # Clean this up
    habits = list(map(lambda x: (x['content'], x['id']), list(filter(lambda x: habit_label['id'] in x['labels'], api.items.all()))))

    return habits

#Tasks API
@app.route('/habits', methods=['GET'])
def habits():
    api_key = os.environ.get('TODOIST_API_KEY')
    api = todoist.TodoistAPI(api_key)
    api.sync()
    habits = get_habits(api)
    return {"tasks": habits}

#Tasks API
@app.route('/task/<task_id>', methods=['GET'])
def task(task_id):
    return {"task": task_id}

if __name__ == '__main__':
    app.run(debug=True)