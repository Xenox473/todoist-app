/* eslint-disable no-template-curly-in-string */
import React, { useState, useEffect } from 'react';
import { ResponsiveCalendar } from '@nivo/calendar';

const App = () => {
  const [data, setData] = useState([{}]);
  const [activeTask, setActiveTask] = useState(null);

  useEffect(() => {
    fetch('/habits').then(
      (res) => res.json(),
    ).then(
      (response) => {
        setData(response);
      },
    );
  }, []);

  const fetchTask = (taskId) => {
    fetch(`/task/${taskId}`).then(
      (res) => res.json(),
    ).then(
      (response) => {
        setActiveTask(response);
      },
    );
  };

  const dates = activeTask?.completion_dates?.map((date) => new Date(date.day));
  const minDate = dates && Math.min(...dates);
  const maxDate = dates && Math.max(...dates);

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
      {!!activeTask?.completion_dates?.length && (
        <div style={{ height: '400px' }}>
          <ResponsiveCalendar
            data={activeTask?.completion_dates}
            from={minDate}
            to={maxDate}
            emptyColor="#EEEEEE"
            colors={['#F7B2B7', '#F7717D', '#DE639A', '#F7B2B7']}
            margin={{
              top: 40, right: 40, bottom: 40, left: 40
            }}
            yearSpacing={25}
            yearLegendPosition="after"
            monthBorderColor="#ffffff"
            dayBorderWidth={2}
            dayBorderColor="#ffffff"
            legends={[
              {
                anchor: 'bottom-right',
                direction: 'row',
                translateY: 36,
                itemCount: 4,
                itemWidth: 42,
                itemHeight: 36,
                itemsSpacing: 14,
                itemDirection: 'right-to-left'
              }
            ]}
          />
        </div>
      )}
    </div>
  );
};

export default App;
