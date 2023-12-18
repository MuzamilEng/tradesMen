const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');

const signUp = async (req, res) => {
    try {
      const { username, password, email, phoneNumber } = req.body;
  
      // Check if the email is already taken
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'email already exists' });
      }
  
      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      // Create and save the new user
      const newUser = new User({
        username,
        password: hashedPassword,
        email,
        phoneNumber
      });
  
     const savedUser = await newUser.save();
  
      res.status(201).json(savedUser);
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  // Local Strategy for handling username/password login
passport.use(new LocalStrategy({
  usernameField: 'email', // Assuming you use email as the username
  passwordField: 'password',
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return done(null, false, { message: 'Incorrect email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return done(null, false, { message: 'Incorrect email or password' });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

// JWT Strategy for handling token-based authentication
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'JSONWEBTOKKENSECRETKEY!@#$%^&*()', // Replace with a secret key for JWT signing
};

passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await User.findById(payload.id);

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
}));

// Login Controller
const login = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (!user) {
      return res.status(401).json({ error: info.message });
    }

    // Generate and sign a JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, 'JSONWEBTOKKENSECRETKEY!@#$%^&*()', { expiresIn: '1h' });

    // Send the token in the response
    return res.json({ token });
  })(req, res, next);
};
// Controller to fetch user details using a JWT token
const getUserDetails = (req, res) => {
  console.log(req.body, "tokken here");
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Send user details in the response
    return res.json({
      id: user._id,
      username: user.username,
      email: user.email,
    });
  })(req, res);
};

const getUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}
module.exports = {
    signUp,
    login,
    getUserDetails
}