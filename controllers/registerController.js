// getting user data from the database
// const userDB = {
//   users: require("../model/users.json"),
//   setUsers: function (data) {
//     this.users = data;
//   },
// };

// const fsPromises = require("fs").promises;
// const path = require("path");
const User = require("../model/User")

const bcrypt = require("bcrypt");

// function to create a new user
const handleNewUsers = async (req, res) => {
  const { user, pwd } = req.body;

  // check if the user and pwd correct
  if (!user || !pwd)
    return res.status(400).json({
      message: "username and password are required",
    });

  // check if there is a duplicate in the database or if the single user already exists
  const duplicate = await User.findOne({ userName:user}).exec();
  if (duplicate) return res.status(409).send({"message":"user already exist"}); //409 send the status of there is a conflict

  // if not then try to create new users with try and catch
  try {
    // encrypt password so that it won't be easy to decrypt or hack the password
    const hashedPassword = await bcrypt.hash(pwd, 10); // await bcrypt hash operation
    
    // creating and storing new users
    const result = await User.create({ 
      userName: user, 
      password: hashedPassword
     }); // new user created

    res.status(201).json({ success: `user created ${user} successfully` });
  } catch (error) {
    // Error handling
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleNewUsers };
