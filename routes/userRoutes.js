const express = require('express');
const controller = require('../controllers/userController');
const {isGuest, isLoggedIn} = require('../middleware/auth');

const router = express.Router();

//Get the sign up form
router.get('/new', isGuest, controller.new);

//Create a new user
router.post('/', isGuest, controller.create);

//Get the login form
router.get('/login', isGuest, controller.loginShow);

//Process the login form
router.post('/login', isGuest, controller.login);

//Get the profile page  
router.get('/profile', isLoggedIn, controller.profile);

//Get the logout page
router.get('/logout', isLoggedIn, controller.logout);

module.exports = router;