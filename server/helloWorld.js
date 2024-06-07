const express = require("express")
const {uuid:v4} =require("uuid")
const app = express()

const helloWorld = () => {
 app.get("./",  (req, res)=> {
  res.send("elloooooooo")
 })
}

module.exports= helloWorld
