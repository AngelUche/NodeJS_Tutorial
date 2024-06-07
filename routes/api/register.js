const express =require("express")
const router =express.Router()
const {handleNewUsers} = require("../../controllers/registerController")

// creating a post request handler to handle new users
router.post('/', handleNewUsers)

module.exports= router
