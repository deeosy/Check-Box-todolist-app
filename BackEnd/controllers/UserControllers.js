const UserModel = require("../model/UserModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const nodemailer = require('nodemailer')
require("dotenv").config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// create new user
const signUp = async (req, res) => {
    try {        
        const { name, email, password } = req.body; // user info from frontend

        if(!name || !email || !password) return res.status(400).json({message: "All fields are required"}) // required input fields

        const existingUser = await UserModel.findOne({email}) // check if email is already in the database
        if(existingUser) return res.status(400).json({message: "User already exists"})

        const hashedPassword = await bcrypt.hash(password, 10)  // hash password before sending to database

        const user = new UserModel({ name, email, password: hashedPassword }) // passing the info to the backend as a new user
        const savedUser = await user.save() // saving the new user in the backend

        // create token after saving user
        const token = jwt.sign({id:savedUser._id}, process.env.JWT_SECRET_KEY, {expiresIn: "1h"})

        // add cookies to the res
        res.cookie("token", token, {httpOnly: true, secure: true, maxAge: 24*60*60*1000, sameSite: "strict"})
            .status(200).json({message: "User created successfully", token, data: savedUser})
    } catch (err) {
        console.error({message: err.message});
        res.status(500).json({message: "Internal server error"})
    }
}

//Sign in user
const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;  // get credentials from frontend
        if(!email || !password) return res.status(400).json("All fields required")  // required input fields

        const user = await UserModel.findOne({email})  // get user from database
        if(!user) return res.status(404).json({message: "User not found"}) 
        
        const isPasswordSame = await bcrypt.compare(password, user.password) // compare passwords
        if(!isPasswordSame) return res.status(400).json({message: "Invalid credentials"})

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: "1d"}) // create a token when user has been able to Log In

        // apply cookies to our res
        res.cookie("token", token, {httpOnly: true, secure: true, maxAge: 24*60*60*1000, sameSite: "strict"})
            .status(200).json({message: "User signed in successfully", token, user: {id:user._id, name: user.name, email: user.email} })
    } catch (err) {
        console.error({message: err.message});
        res.status(500).json({message: "Internal server error"})
    }
}

// Sign out user
const signOut = async (req, res) => {
    try {
        res.clearCookie("token").status(200).json({message: "User successfully signed out"}) // clear cookies to sign out user
    } catch (err) {
       console.error({message: err.message});
        res.status(500).json({message: "Internal server error"})
    }
}

//Request password reset
const requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;
        if(!email) return res.status(400).json({message: "Email is required"})
        
        const user = await UserModel.findOne({email})
        if(!user) return res.status(404).json({message: "User not found"})

        //generate reset token
        const resetToken = jwt.sign({id:user._id}, process.env.JWT_SECRET_KEY, {expiresIn: "15m"})
        const resetLink = `http://localhost:5173/reset-password/${resetToken}`

        // Store token and expiration in database
        user.resetPasswordToken = resetToken
        user.resetPasswordExpires = Date.now() + 15 * 60 * 1000  // 15mins
        await user.save()
        
        // // In production, send email with resetLink. For now, log it
        // console.log("Password reset link: ", resetLink)

        // send email with reset link
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset Request',
            text: `Click the following like to reset your password: ${resetLink}\nThis link expires in 15 minutes.`,
            html: `<p>Click the following link to reset your password: <a href="${resetLink}">${resetLink}</a></p><p>This link expires in 15 minutes.</p>`,
        }

        await transporter.sendMail(mailOptions);

        res.status(200).json({message: "Password reset link generated in console" })  // in production this will be password link generated in email
    } catch (error) {
        console.error({message: error.message})
        res.status(500).json({message: "Internal server error"})        
    }
}

// confirm password reset
const confirmPasswordReset = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        if( !token || !newPassword ) return res.status(400).json({ message: "Token and password are required" })

        //Find user with valid token and non-expired
        const user = await UserModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        })
        if(!user) return res.status(400).json({ message: "Invalid or expired token" })

        // verify token
        try {
            jwt.verify(token, process.env.JWT_SECRET_KEY)
        } catch (error) {
            return res.status(400).json({message: "Invalid token"})            
        }

        //update password
        user.password = await bcrypt.hash(newPassword, 10)
        user.resetPasswordToken = null
        user.resetPasswordExpires = null
        await user.save()
        
        res.status(200).json({message: "Password reset successfully"})
    } catch (error) {
        console.error({message: error.message})
        res.status(500).json({message: "Internal server error"})        
    }
}

module.exports = { signUp, signIn, signOut, requestPasswordReset, confirmPasswordReset }