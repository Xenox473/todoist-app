import React, { useState, useEffect } from 'react';

const App = () => {
  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch('/tasks').then(
      (res) => res.json(),
    ).then(
      (response) => {
        setData(response);
        console.log(response);
      },
    );
  }, []);

  // if (typeof(data?.tasks) === 'undefined') return <p>Loading...</p>;

  return data?.tasks?.map((task) => (
    <p key={task}>{task}</p>
  ));
};

export default App;
