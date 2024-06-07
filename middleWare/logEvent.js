const {format} = require("date-fns")
const {v4:uuid} = require("uuid")

const fs = require("fs")
const fsPromises = require("fs").promises;
const path= require("path")

const logEvent =async(message,fileName )=>{
  const dateTime = `format ${format(new Date(), "yyyy-MM-dd\tHH:mm:ss")}`
  const logDate = `${dateTime}\t${uuid()}\t ${message}\n`;
  // console.log(logDate);

  try {
    if(!fs.existsSync(path.join(__dirname,'..','logs'))){
      await fsPromises.mkdir(path.join(__dirname,'..', 'logs' ))
    }
    await fsPromises.appendFile(path.join(__dirname,'..', "logs", fileName),logDate)
  } catch (error) {
    console.log(error);
  }

}

module.exports =logEvent;