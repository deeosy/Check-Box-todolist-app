// const TodoModel = require('../model/TodoModel')

// const createTodoEntry = async (req, res) => {
//   try {
//     const {todoEntry} = req.body;
//     const userId = req.user.id; 

//     const todoTask = new TodoModel({ todoEntry, user: userId })
//     const savedTask = await todoTask.save()

//     res.status(200).json({message:'Task saved successfully', data: savedTask})
//   } catch (error) {
//     res.status(500).json({message: 'Error saving task', error: error.message})
//   } 
// }

// const retriveTodoTasks = async (req, res) => {
//     // try {
//     //     const {id} = req.params; // get the id from the req body
//     //     if(id){
//     //         const task = await TodoModel.findById(id)

//     //         if(!id) return res.status(400).json({message: 'Task not found'})
            
//     //         return res.status(200).json(task)
//     //     }else {
//     //         const tasks = await TodoModel.find()
//     //         res.status(200).json(tasks)
//     //     }
//     // } catch (error) {
//     //     res.status(500).json({message:'Error retrieving task(s)', error:error.message})
//     // }

//     try {
//       const tasks = await TodoModel.find({user: req.user.id}); // only get logged in user's tasks
//       res.status(200).json(tasks)
//     } catch (error) {
//         res.status(500).json({message:'Error retrieving task(s)', error:error.message})
//     }
// }

// const updateTodoEntry = async (req, res) => {
//   const { id } = req.params  // get id from URL params
//   const { todoEntry } = req.body   // get todoEntry from body

//   try {
//     const task = await TodoModel.findById(id)
//     if(!task) res.status(404).json({message: 'Task not found'})

//     // update these fields if the right id is provided
//     task.todoEntry = todoEntry

//     const updatedTask = await task.save();

//     res.status(200).json({message: 'Task updated successfully', data: updatedTask})

//   } catch (error) {
//     res.status(500).json({message: error.message})
//   }
// }

// const deleteTodoEntry = async (req, res) => {
//   try {
//     //find the id of the task being deleted from the backend based on the id inputed in the frontend
//     const deletedTask = await TodoModel.findByIdAndDelete(req.params.id)
    
//     if(deletedTask){
//       res.status(200).json({message: "Task Deleted"})
//     } else{
//       res.status(404).json({message: "Task not found"})
//     }
//   } catch (error) {
//     res.status(500).json({message: error.message})
//   }
// }





// module.exports = {createTodoEntry, retriveTodoTasks, updateTodoEntry, deleteTodoEntry}


const TodoModel = require('../model/TodoModel')

const createTodoEntry = async (req, res) => {
    try {
        const { todoEntry, completed = false } = req.body // EDIT: Added completed field
        const userId = req.user.id
        const todoTask = new TodoModel({ todoEntry, user: userId, completed })
        const savedTask = await todoTask.save()
        res.status(200).json({ message: 'Task saved successfully', data: savedTask })
    } catch (error) {
        res.status(500).json({ message: 'Error saving task', error: error.message })
    }
}

const retriveTodoTasks = async (req, res) => {
    try {
        const tasks = await TodoModel.find({ user: req.user.id })
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving task(s)', error: error.message })
    }
}

const updateTodoEntry = async (req, res) => {
    const { id } = req.params
    const { todoEntry, completed } = req.body // EDIT: Added completed field
    try {
        const task = await TodoModel.findById(id)
        if (!task) res.status(404).json({ message: 'Task not found' })
        task.todoEntry = todoEntry || task.todoEntry // Preserve existing if not provided
        task.completed = completed !== undefined ? completed : task.completed // EDIT: Update completed
        const updatedTask = await task.save()
        res.status(200).json({ message: 'Task updated successfully', data: updatedTask })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteTodoEntry = async (req, res) => {
    try {
        const deletedTask = await TodoModel.findByIdAndDelete(req.params.id)
        if (deletedTask) {
            res.status(200).json({ message: "Task Deleted" })
        } else {
            res.status(404).json({ message: "Task not found" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { createTodoEntry, retriveTodoTasks, updateTodoEntry, deleteTodoEntry }