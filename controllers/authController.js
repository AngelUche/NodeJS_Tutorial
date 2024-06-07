const User = require('../model/User')

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
// require("dotenv").config();


const handleLoginUser = async (req, res) => {
  const { user, pwd } = req.body;
  // check if the user and pwd correct
  if (!user || !pwd)
    return res.status(400).json({
      message: "Username and password are required"
    });

  const foundUser = await User.findOne({userName: user}).exec();

  if (!foundUser) return res.sendStatus(401); //unauthorized

  try {
    // check password
    const matchPwd = await bcrypt.compare(pwd, foundUser.password);
    if (matchPwd) {
    const roles = Object.values(foundUser.roles)
    // console.log("hello from login page to access post");
    // creating  JWTS to enbale user to login
      const accessToken = jwt.sign(
        { "UserInfo":
          {
            "username":foundUser.userName, 
            "roles":roles,
        }, 
        },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        {expiresIn:"60S"}
      );
      // creating refresh JWTS to enbale user to login
      const refreshToken = jwt.sign(
        {"username":foundUser.userName},
        process.env.REFRESH_TOKEN_SECRET_KEY,
        {expiresIn:"1d"}
      );
    
      foundUser.refreshToken = refreshToken;
      const result = await foundUser.save();
      console.log(result);
      
      // sending the accessToken to allow user to login
      res.cookie("jwt", refreshToken, {httpOnly: true,  sameSite:'None', maxAge: 60 * 60 * 60 *1000}); //secure:true,
      res.json({ accessToken });
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.error("Error comparing passwords:", error);
    res.sendStatus(500); // Internal Server Error
  }
};

module.exports ={handleLoginUser}