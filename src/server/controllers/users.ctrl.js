/* Model */
const User = require('../models/User');

/* Controllers */
module.exports = {

  //Get all users
  getUsers: async function (req, res) {
    await User.find({}, { _id: 0, nickname: 1 })
      .then(users => res.json(users))
      .catch(error => console.error(error))
  },

  //Method for registering a new user
  createUser: async function (req, res) {

    const { nickname, password } = req.body;
    //Check if nickname already exists
    await User.findOne({ nickname })
      .then(async user => {
        if (user) {
          return res.status(400).json({ message: "Nickname already exists [x]" });
        } else {
          //Fill a new user with the req.body data
          const newUser = new User({
            nickname,
            password
          });

          //Save the new document
          await newUser.save();
          res.status(201).json({ message: 'User created [\u2713]' });
        }
      })
      .catch(error => console.log(error));

  },//End createUser

  //Method for login an user
  loginUser: async function (req, res) {

    const { nickname, password } = req.body;
    //Find the user by nickname
    const user = await User.findOne({ nickname });
    if (!user) { return res.status(404).json({ message: "Nickname doesn't exist [x]" }); }

    //Check password
    const passwordMatch = await user.validatePassword(password);
    if (passwordMatch) {
      return res.status(200).json({ message: 'Logged in [\u2713]' });
    } else {
      return res.status(400).json({ message: "Password incorrect [x]" });
    }
  }//End loginUser
};