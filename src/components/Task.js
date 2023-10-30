import { MdDeleteOutline } from 'react-icons/md'


const Task = ({task, onDelete,onToggle}) => {
  return (
    <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={()=>onToggle(task.id)}>
      <h3>Owner Name: {task.text} <MdDeleteOutline style={{color:'red',cursor:'pointer'}} onClick={()=>onDelete(task.id)} /></h3>
      <h4>Pet Name: <span style={{color:'#2c6c80'}}>{task.petName}</span> </h4>
      <p>{task.day}</p>
      <p>{task.time}</p>

    </div>
  )
}
 
export default Task
 