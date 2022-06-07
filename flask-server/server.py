from flask import Flask

#initialize app
app = Flask(__name__)

#Tasks API
@app.route('/tasks', methods=['GET'])
def tasks():
    return {"tasks": ["Task1", "Task2", "Task3"]}

if __name__ == '__main__':
    app.run(debug=True)