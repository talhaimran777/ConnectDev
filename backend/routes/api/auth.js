const express = require('express');
const auth = require('../../middlewares/auth');
const router = express.Router();

// @route   GET api/auth
// @desc    This is a auth route
// @access  public

router.get('/', auth, (req, res) => {
  res.send('Auth Route!');
});

module.exports = router;
