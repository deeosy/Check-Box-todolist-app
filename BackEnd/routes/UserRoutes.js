const express = require("express")
const UserModel = require("../model/UserModel")
const { signUp, signIn, signOut, requestPasswordReset, confirmPasswordReset, authCheck } = require("../controllers/UserControllers")

const router = express.Router()

router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/signout', signOut)

router.post('/reset-password/request', requestPasswordReset)
router.post('/reset-password/confirm', confirmPasswordReset)
router.get('/check', authCheck)

module.exports = router