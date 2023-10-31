import { MdDeleteOutline } from 'react-icons/md'
import { BiTime } from 'react-icons/bi'
import { BiTimer } from 'react-icons/bi'
import { FaUserTie,FaUser } from 'react-icons/fa6'


const Task = ({task, onDelete,onToggle}) => {
  return (
    <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={()=>onToggle(task.id)}>
      <h4> <FaUserTie style={{color:'#e5734f',width:'25px'}} />Owner Name: <span style={{color:'#2c6c80'}}>{task.text}</span></h4>
      <h4><FaUser style={{color:'#e5734f',width:'25px'}}/>Pet Name: <span style={{color:'#2c6c80'}}>{task.petName}</span> </h4>
      <span style={{color:'#2c6c80',borderRightStyle:'solid',paddingRight:'5px'}}><BiTime style={{color:'#e5734f',width:'25px'}} />{task.day}</span>
      <span ><BiTimer style={{color:'#e5734f',width:'25px'}}  />{task.time}</span>
      <div className='delete'> <MdDeleteOutline style={{cursor:'pointer'}} onClick={()=>onDelete(task.id)} /></div>
     

    </div>
  )
}
 
export default Task
 