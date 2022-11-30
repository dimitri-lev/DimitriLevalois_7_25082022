const express = require('express');
const router = express.Router();

const limiter = require('../middleware/rate-limite');
const userCtrl = require('../controllers/user');
const checkEmail = require('../middleware/check-email');
const checkPassword = require('../middleware/check-password');

router.post('/signup', limiter, checkEmail, checkPassword, userCtrl.signup);
router.post('/login', limiter, userCtrl.login);

module.exports = router;
