const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { authenticateJWT } = require('../middleware/authMiddleware');
const passport = require('passport');

const signUp = async (req, res) => {
  try {
    const { firstName, lastName, category, password, email, phoneNumber } = req.body;

    // Check if the email is already taken
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create and save the new user
    const newUser = new User({
      firstName,
      lastName,
      category,
      password: hashedPassword,
      email,
      phoneNumber,
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const login = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (!user) {
      return res.status(401).json({ error: info.message });
    }

    // Generate and sign a JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, 'JSONWEBTOKKENSECRETKEY!@#$%^&*()', {
      expiresIn: '1h',
    });

    // Send the token in the response
    return res.json({ token });
  })(req, res, next);
};

const getUserDetails = (req, res) => {
  console.log(req.body, 'token here');
  // Use the authenticateJWT middleware before processing the request
  authenticateJWT(req, res, async () => {
    // Access the authenticated user through req.user
    const user = req.user;

    // Send user details in the response
    return res.json({
      id: user?._id,
      username: user?.firstName,
      email: user?.email,
      phoneNumber: user?.phoneNumber,
      category: user?.category,
    });
  });
};

module.exports = {
  signUp,
  login,
  getUserDetails,
};
