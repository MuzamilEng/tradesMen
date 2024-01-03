const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middleware/authMiddleware');

const {signUp, login, getUserDetails, allUsers} = require('../controllers/auth');

router.route('/signUp').post(signUp);
router.route('/login').post(login);
router.route('/getDetails').get(getUserDetails);
router.route('/getAllUsers').get(authenticateJWT, allUsers);

module.exports = router