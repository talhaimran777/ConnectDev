const express = require('express');

const router = express.Router();

// @route   GET api/profile
// @desc    This is a users route
// @access  public

router.get('/', (req, res) => {
  res.send('Profile route!');
});

module.exports = router;