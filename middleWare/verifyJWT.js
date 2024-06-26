const jwt = require("jsonwebtoken");
// require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization ||req.headers.Authorization;
  if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
  
  const token = authHeader.split(' ')[1]; // Split by space (' ')
  
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET_KEY,
    (err, decoded) => {
      if (err) return res.sendStatus(403); // Invalid token
      req.user = decoded.UserInfo.UserName;
      req.roles = decoded.UserInfo.roles;
      next();
    }
  );
};

module.exports = verifyJWT;
