const express =require("express")
const router =express.Router()
const {handleRefreshToken} = require("../../controllers/refreshTokenController")

// creating a post request handler to handle new users
router.get('/', handleRefreshToken)

module.exports= router