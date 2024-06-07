const User = require("../model/User")

const jwt = require("jsonwebtoken");
// require("dotenv").config();

const handleRefreshToken =async (req, res) => {
  const refreshToken = req.cookies.jwt;

  console.log("Refresh Token:", refreshToken);
  if (!refreshToken) {
    return res.sendStatus(401); // No JWT token provided
  }
  const foundUser = await User.findOne({ refreshToken}).exec(); 
  if (!foundUser) {
    return res.sendStatus(403); // User not found for refresh token
  }
  console.log(foundUser.refreshToken);
  
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.sendStatus(403); // JWT verification failed
    }
    // Verify decoded user data matches the expected user
    if (foundUser.userName !== decoded.userName) {
      return res.sendStatus(403); // Mismatched user data
    }
    const roles = Object.values(foundUser.roles)
    // Generate a new access token
    const accessToken = jwt.sign(
      { "UserInfo":
      {
        "username":foundUser.userName, 
        "roles":roles,
    }, 
    },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.json({ accessToken });
  });
};
module.exports = { handleRefreshToken };
