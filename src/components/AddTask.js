import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTask = ({onAdd}) => {
    

    const minDate = () => {
        const today = new Date().toISOString().split('T')[0];
        return today;
    };
    // const [formData, setFormData] = useState({
    //   text: "",
    //   day: "",
    //   reminder: "",
    // });
    const [text,setText] = useState('')
    const [petName,setPetName] = useState('')
    const [Note,setNote] = useState('')

    const [day,setDay] = useState(null)
    const [time,setTime] = useState(null)

    const [reminder,setReminder] = useState(false)

    const showToastMessage = () => {
        toast.error('error Please fill out the input !', {
            position: toast.POSITION.TOP_RIGHT
        });
    };

  const onSubmit = (e) =>{
    e.preventDefault()
    if(!(text && petName && Note && day && time)){
        showToastMessage()
        return
    }
    onAdd({text,petName, day,time, reminder})
    setText('')
    setPetName('')
    setNote('')
    setDay('')
    setTime('')
    setReminder(false)

  }
  
    return (
         <form className='add-form' onSubmit={onSubmit}>
                <div className="name">
                    <label for="" className="input_label">Owner Name</label>
                    <input type="text" value={text} className="input" placeholder="Owner Name" onChange={(e) => setText(e.target.value)}/>
                </div>
                <div class="name">
                    <label for="" className="input_label">Pet Name</label>
                    <input type="text" value={petName} onChange={(e) => setPetName(e.target.value)} className="input" placeholder="Pet Name"/>
                </div>
                <div className="name">
                    <label for="" className="input_label">Apt Date</label>
                    <input type="date" value={day}  min={minDate()} onChange={(e) => setDay(e.target.value)} className="input"/>
                </div>
                <div className="name">
                    <label for="" className="input_label">Apt Time</label>
                    <input type="time" onChange={(e) => setTime(e.target.value)} className="input"/>
                </div>
             
                <div className="name">
                    <label for="" className="input_label">Appointments Notes</label>
                    <textarea value={Note} onChange={(e) => setNote(e.target.value)} className="textarea" placeholder="Detailed Comments about the condition" name="" id=""
                        cols="30" rows="10"></textarea>
                </div>
                {/* <div className='name'>
            <label>Set Reminder</label>
            <input
              type='checkbox'
              checked={reminder}
              value={reminder}
              onChange={(e) => setReminder(e.currentTarget.checked)}
            />
          </div> */}
        
            <ToastContainer />

                <input  type='submit' value='submit' className="button" />

            </form>

            

      )
    }

export default AddTask
