const User = require("../model/User")

// const fsPrimises = require("fs").promises
// const path = require("path")


const handleLogOut = async (req, res) => {
  
  const refreshToken = req.cookies.jwt;
  if (!cookies?.jwt) {

    return res.sendStatus(204); // No content
  }
  // is refresh token in db?
  const foundUser = await User.findOne({ refreshToken}).exec();
  if (!foundUser) {
    res.clearCookie('jwt', {httpOnly: true,   secure:true, sameSite:'None'});
    // res.clearCookie('jwt', {httpOnly: true,  secure:true, sameSite:'None'});
    return res.sendStatus(204); // User not found for refresh token
  }

  // delete refreshToken in db
  foundUser.refreshToken ='';
  const result = await foundUser.save()
  console.log(result);

  res.clearCookie('jwt', {httpOnly: true,  secure:true, sameSite:'None'}); // in production, set secure: true to allow onlyb it to be accessed by httpsonly
  res.sendStatus(204)
};

module.exports = { handleLogOut };
