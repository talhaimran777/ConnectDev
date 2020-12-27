const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../../models/User');
const auth = require('../../middlewares/auth');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();
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

// @route   POST api/auth
// @desc    This is a route to authenticate a registered user
// @access  public

router.post(
  '/',
  body('email').isEmail().withMessage('Invalid email format.'),
  body('password').exists().withMessage('Please enter a valid password'),
  async (req, res) => {
    // Let's check for errors
    const errors = validationResult(req);

    // if errors exists send 404 error with errors array to the client
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // If data is validated insert into the database

    const { email, password } = req.body;

    try {
      // First check if the email already exists
      const user = await User.findOne({ email });

      if (!user) {
        // if User exists already give an error
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const match = await bcryptjs.compare(password, user.password);

      if (!match) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.jwtToken,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;

          return res.json({
            token,
          });
        }
      );
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
);

module.exports = router;
