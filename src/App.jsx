import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faCheckSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react'
import './App.css'

library.add(faCoffee, faCheckSquare, faTrash, fab);

function App() {
  const [tasks, setTasks] = useState(
    localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : []
  );
  const [input, setInput] = useState('');

  // Sync tasks to localStorage whenever tasks changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  function handleAddTask() {
    if (input.trim() !== '') {
      setTasks(t => [...t, input]);
      setInput('');
    } else {
      alert("Please enter a task.");
    }
  }

  function handleDeleteTask(idx) {
    setTasks(t => t.filter((_, i) => i !== idx));
  }

  return (
    <>
      <h1>To-Do-List</h1>
      <div className="addtask">
        <input
          type="text"
          placeholder='Add Task...'
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <div className="tasks">
        {tasks.map((task, idx) => (
          <div className="task" key={idx}>
            <h2>{task}</h2>
            <button onClick={() => handleDeleteTask(idx)}>
              <FontAwesomeIcon icon={['fas', 'trash']} />
            </button>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
