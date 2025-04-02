const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const  captainController = require('../Controllers/captainController');
const authMiddleware = require('../Middlewares/auth.middleware');


router.post('/register' , [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min : 3}).withMessage('Name must be at least 3 characters'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters'),
    body('vehicle.color').isLength({min:3}).withMessage('Color must be at least 3 characters'),
    body('vehicle.plateNumber').isLength({min:3}).withMessage('Plate Number must be at least 3 characters'),
    // body('vehicleType').isIn(['car','motorcycle','auto']).withMessage('Invalid Vehicle Type'),

],
(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
captainController.registerCaptain(req, res);
});


router.post('/login' , [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters'),
],
captainController.loginCaptain
)

router.get('/profile',authMiddleware.authCaptain, captainController.getCaptainProfile)
router.get('/logout',authMiddleware.authCaptain, captainController.logoutCaptain)
module.exports = router;