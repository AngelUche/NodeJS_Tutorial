const logEvent = require('./logEvent')

const errorHandler=(err, req, res, next)=>{
  logEvent(`${err.message}`, 'logerEror.txt')
  // console.log(err.stack);
  res.status(500).send(err.message)
}
module.exports  ={errorHandler}
