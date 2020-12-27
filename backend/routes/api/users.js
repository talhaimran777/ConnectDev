const express = require('express');
const { body, validationResult } = require('express-validator');
const gravatar = require('gravatar');

const bcrypt = require('bcrypt');
// Requiring in User model
const User = require('../../models/User');

const router = express.Router();

// @route   POST api/users
// @desc    This is a route to register a new user
// @access  public

router.post(
  '/',
  body('name').isAlpha().withMessage('Username cannot contain any numbers.'),
  body('email').isEmail().withMessage('Invalid email format.'),
  body('password')
    .isLength({ min: 5 })
    .withMessage('Password has to be minimum 5 characters long.')
    .matches(/\d/)
    .withMessage('Password must contain atleast one number'),
  async (req, res) => {
    // Let's check for errors
    const errors = validationResult(req);

    // if errors exists send 404 error with errors array to the client
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    // If data is validated insert into the database

    const { name, email, password } = req.body;

    try {
      // First check if the email already exists
      const user = await User.findOne({ email });

      if (user) {
        // if User exists already give an error
        res.status(400).json({ errors: [{ msg: 'User already exists!' }] });
      } else {
        // Write a query here to insert a new user into the database!
        const gravatarURL = gravatar.url(email, {
          s: '200',
          r: 'pg',
          d: 'mm',
        });

        const user = new User({
          name,
          email,
          password,
          avatar: gravatarURL,
        });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(email, salt);
        user.password = hashedPassword;

        await user.save();

        res.status(200).json({
          msg: 'User got registered successfully!',
        });
      }

      // user
      //   .save()
      //   .then(() => res.send('Inserted Successfully'))
      //   .catch(() => res.send('Could not insert Data into the database!'));
    } catch (error) {
      res.status(500).send();
    }
  }
);

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
