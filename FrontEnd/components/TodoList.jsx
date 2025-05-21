// import React, { useEffect, useState } from 'react'
// import TodoCard from './TodoCard'
// import TodoInputField from './TodoInputField'
// import axios from 'axios'
// import Header from './Header'
// import Footer from './Footer'

// const baseURL = 'http://localhost:4002'

// export default function TodoList() {
//     const [todoList, setTodoList] = useState([]) 
//     const [loading, setLoading] = useState(true)
//     const [error, setError] = useState(null)

//     const fetchTodoEntries = async () => {
//         try {
//             const response = await axios.get(baseURL, {withCredentials: true})  // send cookie for authentication 
//             setTodoList(response.data)
//             setLoading(false)
//         } catch (error) {
//             // setTodoList('Failed to load task(s)')
//             setError('Failed to load task(s)')
//             setLoading(false)
//         }            
//     }

//     const handleTaskUpdated = (updatedTask, deletedId = null ) => {  // callback  to update the task in the todoList state
//       if (deletedId){
//         setTodoList((prevList) => prevList.filter((task) => task._id !== deletedId ))
//       } else {
//         setTodoList((prevList) => {
//           prevList.map((task) => (task._id === updatedTask._id ? updatedTask : task) )
//         })
//       }
//     }

//     useEffect(() => {
//         fetchTodoEntries()
//     }, [])
    
//   return (
//     <div className="px-3 max-w-xl mx-auto ">
//       <Header />
//       <div className='px-3 bg-white/34 -mt-3  '>
//           {/* <h2 className='text-2xl text-center' >Todo List</h2> */}
//           <div className="flex flex-col gap-3 py-10 ">
//               {/* we pass fetchTodoEntries as props so we can refresh the page after we submit a new form and load new Tasks */}
//               <div className=" mb-5 ">
//                 <TodoInputField refreshTasks={fetchTodoEntries} />    
//               </div>
//               { loading ? ( 
//                   <div className="">Loading tasks...</div>
//               ) : error ? (
//                   <div className="">{error}</div>
//               ) : ( 
//                   todoList.slice().reverse().map((task) => (      // since i want to reverse the array without mutating it i used .slice() to create a new array before before .reverse()         
//                     <TodoCard task={task} key={task._id} onTaskUpdated={handleTaskUpdated} /> 
//                   ))
//               )}
//           </div>
//       </div>
//       <Footer />
//     </div>
//   )
// }


import React, { useEffect, useState } from 'react'
import TodoCard from './TodoCard'
import TodoInputField from './TodoInputField'
import axios from 'axios'
import Header from './Header'
import Footer from './Footer'

const baseURL = 'http://localhost:4002'

export default function TodoList() {
    const [todoList, setTodoList] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [activeTab, setActiveTab] = useState('all')

    const fetchTodoEntries = async () => {
        try {
            const response = await axios.get(baseURL, { withCredentials: true })
            setTodoList(response.data.reverse())
            setLoading(false)
        } catch (error) {
            setError('Failed to load task(s)')
            setLoading(false)
        }
    }

    const handleTaskUpdated = (updatedTask, deletedId = null) => {
        if (deletedId) {
            setTodoList((prevList) => prevList.filter((task) => task._id !== deletedId))
        } else {
          setTodoList((prevList) =>
            prevList.map((task) => (task._id === updatedTask._id ? updatedTask : task))
          );
        }
    }

    useEffect(() => {
        fetchTodoEntries()
    }, [])

    const getFilteredTasks = () => {   // filter task function
      if(activeTab === 'available') {
        return todoList.filter((task) => !task.completed);
      } else if(activeTab === 'completed') {
        return todoList.filter((task) => task.completed );
      }
      return todoList; // "all" filter
    }

    return (
        <div className="px-3 max-w-xl mx-auto  ">
            <Header />
            <div className="px-3 bg-white/34 -mt-3">
                <div className="flex flex-col gap-3 pt-10 py-4 overflow-hidden ">
                  <div className="mb-5">
                    <TodoInputField refreshTasks={fetchTodoEntries} />
                  </div>
                  <div className="flex justify-around bg-sky-400/10 rounded-t-lg p-2">
                    <button onClick={()=>setActiveTab('all') }
                      className={`flex-1 py-0.5 rounded-t-md cursor-pointer ${activeTab === 'all' ?'bg-sky-300/70 text-white' : 'text-gray-400' } `}
                    >All</button>
                    <button onClick={()=>setActiveTab('available') }
                      className={`flex-1 py-0.5 rounded-t-md cursor-pointer ${activeTab === 'available' ?'bg-sky-300/70 text-white' : 'text-gray-400' } `}
                    >Available</button>
                    <button onClick={()=>setActiveTab('completed') }
                      className={`flex-1 py-0.5 rounded-t-md cursor-pointer ${activeTab === 'completed' ?'bg-sky-300/70 text-white' : 'text-gray-400' } `}
                    >Completed</button>
                  </div>
                  {loading ? (
                      <div>Loading tasks...</div>
                  ) : error ? (
                      <div>
                        {error}
                        <button onClick={fetchTodoEntries} className='ml-2 border border-black cursor-pointer' >
                          Retry
                        </button>
                      </div>
                  ) : (<div className="flex flex-col gap-2 h-[60vh] overflow-scroll no-scrollbar ">{
                        getFilteredTasks().map((task) => (
                            // EDIT: Wrap each TodoCard in overflow-hidden and pass focus props
                            <div key={task._id} className="">
                                <TodoCard
                                    task={task}
                                    onTaskUpdated={handleTaskUpdated}
                                />
                            </div>
                        ))}
                  </div>
                  )}
                </div>
            </div>
            <Footer />
        </div>
    )
}
