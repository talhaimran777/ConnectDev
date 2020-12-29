const express = require('express');
const auth = require('../../middlewares/auth');
const router = express.Router();
const Profile = require('../../models/Profile');
const { body, validationResult } = require('express-validator');

// @route   GET api/profile/me
// @desc    This route will return the current user's
//          profile based on the valid token
// @access  private

router.get('/me', auth, async (req, res) => {
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

// @route   POST api/profile/
// @desc    This route will be responsible to create and
//          update a current user's profile
// @access  private

router.post(
  '/',
  auth,
  body('status', 'Status cannot be empty').not().isEmpty(),
  body('skills', 'Skills cannot be empty').not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      status,
      skills,
      bio,
      githubusername,
      youtube,
      facebook,
      linkedin,
      twitter,
      instagram,
    } = req.body;

    const profileFields = {};

    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (githubusername) profileFields.githubusername = githubusername;
    if (company) profileFields.company = company;

    profileFields.status = status;

    // Let's build profile for skills
    profileFields.skills = skills.split(',').map((skill) => skill.trim());

    profileFields.social = {};

    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // Update that profile
        profile = await Profile.findOneAndUpdate({
          user: req.user.id,
          $set: profileFields,
          new: true,
        });

        return res.status(200).json(profile);
      }

      profile = new Profile(profileFields);
      await profile.save();
      return res.status(200).json(profile);
    } catch (error) {
      return res.status(500).send('Server Error!');
    }
  }
);

// @route   GET api/profile/
// @desc    This route will return all the profiles
// @access  public

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);

    return res.status(200).json(profiles);
  } catch (err) {
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
