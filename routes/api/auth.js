const express =require("express")
const router =express.Router()
const {handleLoginUser} = require("../../controllers/authController")

// creating a post request handler to handle new users
router.post('/', handleLoginUser)

module.exports= router