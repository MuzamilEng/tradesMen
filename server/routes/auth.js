const express = require('express');
const router = express.Router();

const {signUp, login, getUserDetails} = require('../controllers/auth');

router.route('/signUp').post(signUp);
router.route('/login').post(login);
router.route('/getDetails').get(getUserDetails);

module.exports = router