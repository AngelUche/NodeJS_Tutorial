// in event listner, there 2 main things that you cna use to listen the .addListener and the .on, they bothe work te same way
event.addListener(what to listen to, function of what us it listeneding to)
event.addListener("Hello", ()=>console.log("Hello"))

that is they are both to listen to th event

the emit is used to emit the event
event.emit(what to listen to, "any message to be passed accrose)

path.join(__dirname, "folder", "file name")


// class MyEmitter extends events {};

// initilalizing the event emitter
// const myEmitter = new MyEmitter();

// // adding listeneer
// myEmitter.on("log Folder", (msg)=>{logEvents(msg)})
// myEmitter.emit("log Folder", "log event finally created")


// // creating new instance of tthe event
// const Emmitter = new events()
// Emmitter.addListener("Another Event created", ()=>{
//   console.log("uche created another event for testing purpose");
// })
// // emiteint the messgae
// Emmitter.emit("Another Event created", "Testing event created")
 

app.get('/api/data', (req, res) =>{
  res.send("hello welcome to data sending site")
})
// redirecting with express
// app.get('/', (req, res) =>{
//   res.redirect(301, "logEvent.js")
// });

// sending error to the server if error occurs
// app.get('/*', (req, res) =>{
//   res.status(404).sendFile(path.join(__dirname, "server", "helloWorld.js"))
// });

app.get('/api/customers',(req, res)=>{
  res.status(200).send("name", customers)
  // const response = { customers: customers };
  // res.json(response);
})

app.listen(PORT, ()=>{
  console.log(`port created and listened to ${PORT}` );
})


// const corsOptions={
//   origin:(origin, callback)=>{
//     if(whitelist.indexOf(origin) !== -1){
//       callback(null, true)
//       console.log(origin, );
//     } else {
//       callback( 
//         new Error("Not allowed by CORS policy")      
//       )
//     }
//   },
//   optionsSuccessStatus: 200
// }



      const corsOptions = {
        origin: function (origin, callback) {
          // Allow requests without an Origin header (e.g., requests from file:// or Postman)
              console.log('Request origin:', origin, callback);
          if (!origin) {
      return callback(null, true);
    }

    // Check if the origin is in the whitelist
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};



app.get('/', (req, res) =>{
  res.sendFile(path.join(__dirname, "server", "helloWorld.js"))
});



**Middel Ware**
there basically 3 types of middle are
1) custom middle ware
2) third party middle ware
3) Built in midddle ware: this is middle ware was built in to javascript

for form data and encoded data 
app.use(express.urlencided({enxtended:true}))
<!-- meaning it should accept encoded data like  -->
<!-- "content-type:application/x-www-form-urlncoded" -->

for json files
app.use(express.json())
<!-- this means it can acceppt json files -->


to serve static files like images and all
app.use(express.static(path to which the static files should be served from))
e.g
app.use(express.static(path.join(___dir, "folder")))


app.get('/', (req, res) => {
  // let responseText = `Hello World! ${req.requestTime}`
  //  responseText += `<small>Requested at: ${req.requestTime}</small>`
  // res.send(responseText)
  res.send("hello world")
})


// getting requests without routing
app.get('/user/:id', (req, res, next) => {
  console.log('Request Type:', req.method)
  res.send(req.params.id)
  // next()
})



// // function to create a new user
// const handleLoginUser =async (req, res)=>{
//   const {user, pwd} = req.body;
//   // check if the user and pwd correct
//   if(!user || !pwd) return res.status(400).json({
//     "message": "username and password are required",
//   });

//   const foundUser = userDB.users.find((person)=>person.userName===user);
//   if(!foundUser) return res.sendStatus(401) //unauthorized

//   // check password
//   const matchPwd =await bcrypt.compare(pwd, foundUser.pasword);

//   if(matchPwd){
//     res.json({ "sucess": ` User ${user} is Logged in successfully`})
//   } else{
//      res.sendStatus(401)
//   }
// }  
// module.exports ={handleLoginUser}