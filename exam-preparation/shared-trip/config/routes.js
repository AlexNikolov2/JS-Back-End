const { Router } = require('express');

const homeController = require('../controllers/home');
const authController = require('../controllers/auth');
const tripController = require('../controllers/trip');
const notFoundController = require('../controllers/404');

const router = Router();

router.use('/', homeController);
router.use('/auth', authController);
router.use('/trips', tripController);

router.use('*', notFoundController);

module.exports = router;