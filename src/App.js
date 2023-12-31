
import './App.css';
import { useState, useEffect } from 'react'
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import { BsCalendar2Date } from 'react-icons/bs'
import { AiOutlineSortAscending } from 'react-icons/ai'
import { AiOutlineSortDescending } from 'react-icons/ai'
import {TbDatabaseExclamation} from 'react-icons/tb'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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




  const ascendingEvent = () =>{
    let data = [...tasks]
    if(data.length > 0){
     let result = data.sort((a,b) => a.text.localeCompare(b.text))
     setTasks(result)
    }
   }
   const descendingEvent = () =>{
    let data = [...tasks]
    if(data.length > 0){
     let result = data.sort((a,b) => b.text.localeCompare(a.text))
     setTasks(result)
    }
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
    if(data !=null){
      showToastMessage()
    }

    setTasks([...tasks, data])
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


  const showToastMessage = () => {
    toast.success('Success Notification !', {
        position: toast.POSITION.TOP_RIGHT
    });
};


  return (
    <div className="container">
      <h1 className='h1'><BsCalendar2Date style={{width:'25px',color:'#f58686',marginRight:'3px',height:'25px'}} />Your Appointments
      </h1>

      <div className="container1">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        {showAddTask && <AddTask onAdd={addTask} />}

      </div>
     
      <div className='btn1' onClick={ascendingEvent} ><AiOutlineSortAscending style={{color:'white'}} /></div>
      <div className='btn2'  onClick={descendingEvent} ><AiOutlineSortDescending style={{color:'white'}} /></div>
      <ToastContainer />

      <Search />
      {tasks.length > 0 ? (<Tasks tasks={tasks}
        onDelete={deleteTask} onToggle={toggleReminder} />) : <p className='Show'><TbDatabaseExclamation style={{color:'red'}}  />No Appointments To Show...</p>}
    </div>

  )
}

export default App; 
