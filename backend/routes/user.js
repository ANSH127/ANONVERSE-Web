
const express = require('express');
const router = express.Router();
const UserControllers = require('../controllers/userController');
const requireAuth = require('../middleware/requireAuth');

// login route

router.post('/login', UserControllers.loginUser);

// signup route

router.post('/signup', UserControllers.signupUser);

// update user avatar route
router.patch('/update-avatar', requireAuth, UserControllers.updateUserAvatar);

module.exports = router;