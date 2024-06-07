const express =require("express")
const router =express.Router()
const {handleLogOut} = require("../../controllers/logOut")

// creating a post request handler to handle new users
router.get('/', handleLogOut)

module.exports= router