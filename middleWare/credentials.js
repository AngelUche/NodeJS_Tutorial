const allowedOrigin = require('../config/allowedOrigin');

const credentials = (req, res, next)=>{
  const origin = req.header.origin;
  if(allowedOrigin.includes(origin)) {
    res.header('Access-Control-Allow-Origin', true);
  };
  next()
}

module.exports= credentials