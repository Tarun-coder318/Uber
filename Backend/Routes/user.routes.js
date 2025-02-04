const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const  userController = require('../Controllers/userController');

router.post('/register' , [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min : 3}).withMessage('Name must be at least 3 characters'),
    body('passward').isLength({min:6}).withMessage('Password must be at least 6 characters'),
],
userController.registerUser
)



module.exports = router;