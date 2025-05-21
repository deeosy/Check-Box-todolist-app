const {createTodoEntry, retriveTodoTasks, updateTodoEntry, deleteTodoEntry} = require('../controllers/TodoControllers')
const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/', authMiddleware, retriveTodoTasks)
router.post('/tasks', authMiddleware, createTodoEntry)
router.put('/tasks/:id', authMiddleware, updateTodoEntry)
router.delete('/tasks/:id', authMiddleware, deleteTodoEntry)

module.exports = router