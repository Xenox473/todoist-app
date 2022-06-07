import React, { useState, useEffect } from 'react'

function App() {

  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("/tasks").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])
  return (
    <div>
      {(typeof(data.tasks) === 'undefined') ? (
        <p> Loading...</p>
      ) : (
        data.tasks.map((task, i) => (
          <p key={i}>{task}</p>
        ))
      )}
    </div>
  )
}

export default App