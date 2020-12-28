const express = require('express');
const auth = require('../../middlewares/auth');
const router = express.Router();
const Profile = require('../../models/Profile');
// @route   GET api/profile/me
// @desc    This route will return the current user's
//          profile based on the valid token
// @access  private

router.get('/me', auth, async (req, res) => {
  console.log(req.user.id);
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(400).send('No profile found!');
    }

    return res.status(200).json(profile);
  } catch (error) {
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
