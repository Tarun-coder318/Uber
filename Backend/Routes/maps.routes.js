const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middlewares/auth.middleware');
const mapsController = require('../Controllers/mapcontrollers');
const {query} = require('express-validator');


router.get('/get-coordinates',query('address').isString().isLength({min:3}),
 authMiddleware.authUser,mapsController.getCoordinates);

 router.get('/get-distance',query('origin').isString().isLength({min:3}),query('destination').isString().isLength({min:3}),
    authMiddleware.authUser,mapsController.getDistance);
    router.get('/get-suggestions',query('input').isString().isLength({min:3}),
authMiddleware.authUser,mapsController.getSuggestions);
 module.exports = router;