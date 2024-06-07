require("dotenv").config();
const {errorHandler} = require('./middleWare/errorHandler')
const corsOptions = require("./config/corsOptions")
const credentials = require('./middleWare/credentials')

const express = require("express")
const cors =require('cors')
const bodyParser = require('body-parser');
const verifyJWT = require("./middleWare/verifyJWT");
const cookieParser = require("cookie-parser");

// requiring monogoose to wor wit the mongoose
 const mongoose = require('mongoose')
 const ConnetDB = require('./config/ConnectDB')




// creating an instance of the express
const app = express()

// connecting to the database
ConnetDB()

// creating port to listen to
const PORT = process.env.PORT || 3000
// Middleswares
app.use(credentials)
// using midddlewaren to create list of allowed cors   
app.use(cors(corsOptions))
//Builtin MiddleWare for formData
app.use(express.urlencoded({extended:false}));
// middlerware for cookies
app.use(bodyParser.json());
app.use(cookieParser());


//  creating routes for new users
app.use("/register", require("./routes/api/register"))
//  creating routes for logging in users
app.use("/auth", require("./routes/api/auth"))
//  creating routes for refresh token
app.use("/refresh", require("./routes/api/refreh"))
//  logout users routes
app.use("/signout", require("./routes/api/logOut"))

// verify if the user is authorized with an access token
app.use(verifyJWT);
//  creating routes for our various APIs
app.use("/employees", require("./routes/api/employees"))

// sending error to the server if error occurs
app.all('*', (req, res) =>{
  res.status(404);
  if(req.accepts("html")){
    req.sendFile(path.join(__dirname, "server", "helloWorld.js"))
  }else if(req.accepts('json')){
    res.json({error:"404 Not found"})
  } else{
    res.type('txt').send("404 Not found")
  }
});

// sending custom error message to the front end developer
app.use(errorHandler)

mongoose.connection.once('open', ()=>{
  console.log("database Connected");

  app.listen(PORT, ()=> console.log(`port created and listened to ${PORT}` ))
})
