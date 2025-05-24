import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AddIcon from './addIcon';

export default function TodoInputField({refreshTasks}) {
    const [todoEntry, setTodoEntry] = useState('');
    const [status, setStatus] = useState(null)

    const [isButtonVisible, setIsButtonVisible] = useState(false)
    const [isButtonSliding, setIsButtonSliding] = useState(false)
    
    const handleTaskEntry = (e) => {
      const { value} = e.target
      setTodoEntry(value)
      setIsButtonVisible(value.length > 0);  //add button made visible with entry
    }

    useEffect(() => {
      if(isButtonVisible){
        setTimeout(()=>setIsButtonSliding(true), 0); // delay to ensure button renders b4 it slides in
      }else{
        setIsButtonSliding(false);
      }
    },[isButtonVisible]) // use effect when we click button

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!todoEntry.trim()) return;  // this prevents empty entries
        try {
            const response = await axios.post('https://check-box-todolist-app.onrender.com/tasks', { todoEntry }, {headers: {'Content-Type': 'application/json'}, withCredentials: true} )
            setStatus('Task created successfully')
            setTodoEntry('')
            setIsButtonVisible(false);  // hide button after submission
            refreshTasks()
            setTimeout(()=> {setStatus(null)}, 2000)
        } catch (error) {
            setStatus('Error creating task. Please try again')
            setTimeout(()=> {setStatus(null)}, 2000)
        }
    }
    
  return (
    <>
      <form className='flex gap-2 items-center relative ' onSubmit={handleSubmit} >
        <input maxLength={100} required value={todoEntry} onChange={handleTaskEntry} type="text" name='Todo Entry' placeholder='Add a new task...' 
          className={`px-3 py-2 rounded-md border border-slate-400  w-full transition-all duration-300 ${
            isButtonVisible ? 'max-w-[calc(100%-60px)]' : 'max-w-full' // shrink input when btn is visible
          }`} />
          <div className={`absolute right-0 top-0 h-full flex items-center transition-transform duration-300 transform ${
            isButtonVisible 
              ? isButtonSliding ? 'translate-x-0 opacity-100 ' : 'translate-x-[50px] opacity-100 '
              : 'translate-x-[50px] opacity-0'} `} //appear instantly outside and the slides in
          >  
            <AddIcon />
          </div>
      </form>
      { status && <p className={`mt-2 text-center ${status.includes('Error') ? 'text-red-500' : 'text-green-500' } `}>{ status }</p> }
    </>
  )
}
