const express = require('express')
// const bodyParser = require('body-parser')
const { default: mongoose } = require('mongoose')
const todoRoutes = require('./routes/TodoRoutes')
const userRoutes = require('./routes/UserRoutes')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require("dotenv").config()

const port = 4002
const server = express()

// middlewares 
server.use(cookieParser())
server.use(cors({ 
  origin: "http://localhost:5173",  // cors configuration
  credentials: true,   // need to allow cookies to work
}))
server.use(express.json())

//routes
server.use(todoRoutes)
server.use(userRoutes)


//mongoose connection
mongoose.connect(process.env.MONGO_DB).then((result) => {
  server.listen(port, () => {
    console.log(`server is live at http://localhost:${port}`);
  })
}).catch((err) => {
  console.log(err);
})