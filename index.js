const logEvents = require("./logEvent")
const events = require("events")

class MyEmitter extends events {};

// initilalizing the event emitter
const myEmitter = new MyEmitter();

// adding listeneer
myEmitter.on("log Folder", (msg)=>{logEvents(msg)})
myEmitter.emit("log Folder", "log event finally created")


// // creating new instance of tthe event
// const Emmitter = new events()
// Emmitter.addListener("Another Event created", ()=>{
//   console.log("uche created another event for testing purpose");
// })
// // emiteint the messgae
// Emmitter.emit("Another Event created", "Testing event created")
