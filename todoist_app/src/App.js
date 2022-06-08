/* eslint-disable no-template-curly-in-string */
import React, { useState, useEffect } from 'react';

const App = () => {
  const [data, setData] = useState([{}]);
  const [activeTask, setActiveTask] = useState({});

  useEffect(() => {
    fetch('/habits').then(
      (res) => res.json(),
    ).then(
      (response) => {
        setData(response);
        console.log(response);
      },
    );
  }, []);

  const fetchTask = (taskId) => {
    fetch(`/task/${taskId}`).then(
      (res) => res.json(),
    ).then(
      (response) => {
        setActiveTask(response);
        console.log(response);
      },
    );
  };

  // if (typeof(data?.tasks) === 'undefined') return <p>Loading...</p>;

  return (
    <div>
      <h1>Habits</h1>
      {data?.tasks?.map((task) => (
        <ul>
          <li key={task}>
            <button type="button" onClick={() => fetchTask(task.id)}>
              {task.name}
              {' '}
            </button>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default App;
