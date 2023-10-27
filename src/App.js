
import './App.css';
import { useState, useEffect } from 'react'
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import { BsCalendar2Date } from 'react-icons/bs'
import Search from './components/Search';



function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])


  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])


  // Fetch Taks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data

  }

  // Add Task 
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    const data = await res.json()

    setTasks([...tasks, data])

    // const id =  Math.floor(Math.random() * 10000) + 1
    // const newTask = {id,...task}
    // setTasks([...tasks,newTask])
  }

  //Delete Task 
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE', })
    setTasks(tasks.filter((task) => task.id !== id))

  }


  // Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? {
          ...task, reminder:
            !task.reminder
        } : task
      )
    )
  }
  return (
    <div className="container">
      <h1><BsCalendar2Date style={{width:'25px',color:'#f58686',marginRight:'3px',height:'25px'}} />Your Appointments
      </h1>

      <div className="container1">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        {showAddTask && <AddTask onAdd={addTask} />}

      </div>
      <Search />
      {tasks.length > 0 ? (<Tasks tasks={tasks}
        onDelete={deleteTask} onToggle={toggleReminder} />) : ('No Appointments To Show')}
    </div>

  )
}

export default App; 