const express = require('express');

// Requiring in User model
// const User = require('../../models/Users');
const router = express.Router();

// @route   POST api/users
// @desc    This is a route to register a new user
// @access  public

router.post('/', (req, res) => {
  console.log(req.body);
  // Write a query here to insert a new user into the database!
});

// router.get('/', async (req, res) => {
//   res.send('Users route!');

//   // await User.create({
//   //   name: 'Talha Imran',
//   //   email: 'devtal284@gmail.com',
//   //   password: 'talha157',
//   //   avatar: 'Link to my gravatar account',
//   //   date: Date.now(),
//   // });
// });

module.exports = router;
