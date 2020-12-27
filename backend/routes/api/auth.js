const express = require('express');
const User = require('../../models/User');
const auth = require('../../middlewares/auth');
const router = express.Router();

// @route   GET api/auth
// @desc    This is a auth route
// @access  public

// auth is the middleware here
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).send('Error connecting to the database!');
  }
});

module.exports = router;
