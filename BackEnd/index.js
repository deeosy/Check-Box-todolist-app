const express = require('express')
const { default: mongoose } = require('mongoose')
const todoRoutes = require('./routes/TodoRoutes')
const userRoutes = require('./routes/UserRoutes')
const nodemailer = require('nodemailer')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require("dotenv").config()

const port = process.env.PORT
const server = express()
const alloweOrigins = process.env.ALLOWED_ORIGINS

// middlewares 
server.use(cookieParser())
server.use(cors({ 
  // origin: "http://localhost:5173",  // cors configuration  for local host

  // cors config for deployment
    origin: (origin, callback) => {
    if(!origin) return callback(null, true)  // allow request with no origin like postman
    if(alloweOrigins.includes(origin)){
      return callback(null, true)
    }else{
      return callback(new Error('Not allowed by CORS'))
    }
    
  },
  
  credentials: true,   // need to allow cookies to work
}))
server.use(express.json())  // using this instead of body-parser

//Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,  // add email and password to .env file
    pass: process.env.EMAIL_PASS, 
  }
})

// Verify transporter configuration
transporter.verify((err, success) => {
  if(err){
    console.log('Email transporter error: ', err)
  } else {
    console.log('Email transporter is ready: ', success);
    
  }
})

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