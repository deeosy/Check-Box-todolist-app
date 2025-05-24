import axios from 'axios'
import React, { useEffect, useState } from 'react'
import edit from '../src/assets/edit.svg'
import save from '../src/assets/save.svg'
import cancel from '../src/assets/cancel.svg'
import del from '../src/assets/del.svg'
import unChecked from '../src/assets/unchecked.svg'
import checked from '../src/assets/check-box-logo.svg'

export default function TodoCard({task, onTaskUpdated }) {
  const baseURL = 'https://check-box-todolist-app.onrender.com'

  const [isEditing, setIsEditing] = useState(false) //state to track whether the card is in editing mode
  const [editedTask, setEditedTask] = useState(task.todoEntry)  //state to store the edited task text (initially set to the current task value)
  const [isChecked, setIsChecked] = useState(task.completed)
  const [isExpanded, setIsExpanded] = useState(false)


  const handleEdit = () => {  // function for the edit btn to activate editing mode
    setIsEditing(true)
  }

  const handleCancel = () => { // handle canceling edit mode and revert changes
    setIsEditing(false) 
    setEditedTask(task.todoEntry)  // reset to original or previous task value
  }

  const handleSave = async () => {
    try {  // send put request to update the task using axios
      const updatedTask = {...task, todoEntry: editedTask }
      const response = await axios.put(`${baseURL}/tasks/${task._id}`, {todoEntry: editedTask}, {headers: { "Content-Type" : 'application/json'}, withCredentials: true})
      
      setIsEditing(false)  // exit editing mode

      if(onTaskUpdated){  // notifiy parent component that task was updated
        onTaskUpdated(response.data.data || updatedTask)
      }
    } catch (error) {
      console.error('Error updating task:', error.response?.data || error.message)
    }
  }

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this task?")
    if(!confirmed) return; 

    try {
      const response = await axios.delete(`${baseURL}/tasks/${task._id}`, {withCredentials: true})
      if(onTaskUpdated){
        // if edit value is null and has an id we will use that id to delete the Todo item
        onTaskUpdated(null, task._id)   
      }
    } catch (error) {
      console.error("Error deleting task: ", error.response?.data || error.message)     
    }
  }

  useEffect(() => {
    setIsChecked(task.completed)
  }, [task.completed])

  const toggleIsChecked = async () => {
    try {
      const updatedTask = {...task, completed: !isChecked}
      await axios.put(
        `${baseURL}/tasks/${task._id}`,
        {completed: !isChecked},
        {headers: {'Content-Type': 'application/json'}, withCredentials: true}
      )
      setIsChecked(!isChecked)
      if(onTaskUpdated){
        onTaskUpdated(updatedTask)
      }
    } catch (err) {
      console.error('Error updating task completion: ', err.response?.data || err.message);
    }
  }


  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }


  return (
    <>
      <div className="flex gap-2 ">
        <div className='px-3 py-1 w-[calc(100%-80px)] border border-slate-400 rounded-md flex justify-between'>
          {isEditing ? (
            // if editing, show input field with current value
            <input type="text"  value={editedTask} onChange={e => setEditedTask(e.target.value)} 
              className='w-full outline-none'
              autoFocus // automatically focus on the input field when entering edit mode
            />
            ) : (
              <div className={`flex w-full cursor-pointer  `} onClick={toggleExpanded} >
                <div className={`mr-2 h-6 w-6 min-h-[20px] min-w-[20px] flex-shrink-0  `} 
                  onClick={(e) => {
                    e.stopPropagation(); // prevent triggering the parent click
                    toggleIsChecked();
                  }} 
                > 
                            
                  {isChecked ? (
                    <img src={checked} alt=""  />
                  ) : (
                    <img src={unChecked} alt="" className='p-0.5'  />
                  )}
                </div>
                {/* if not editing, just show the task text */}
                <div className={`flex-1 overflow-hidden transition-max-height duration-1000 ease-in-out 
                ${isExpanded ? 'max-h-96' : 'max-h-6'} `}>
                  <h3 className={`${isChecked ? 'line-through' : ''} ${isExpanded ? 'whitespace-normal break-words': 'truncate'}`} 
                  >
                    {task.todoEntry}
                  </h3>
                </div>
              </div>          
          )}
        </div>
        <div className="relative">
          <div className="flex gap-3  ">
            {isEditing ? (
              <>
                <button onClick={handleCancel} className=' cursor-pointer' >
                  <img src={cancel} alt="" className=' max-h-[30px] max-w-[30px]  ' />
                </button>
                <button onClick={handleSave} className=' cursor-pointer' >
                  <img src={save} alt="" className=' max-h-[30px] max-w-[30px] ' />
                </button>
              </>
            ) : (  
              <>
                <button className=' cursor-pointer' onClick={handleDelete} >
                  <img src={del} alt="" className=' max-h-[30px] max-w-[30px] ' />
                </button>
                <button className=' cursor-pointer' onClick={handleEdit} >
                  <img src={edit} alt="" className=' max-h-[30px] max-w-[30px] ' />
                </button>
              </>        
            )}
          </div>
        </div>
      </div>
    </>
  )
}

