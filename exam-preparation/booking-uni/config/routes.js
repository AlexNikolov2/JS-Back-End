const { Router } = require('express');

const homeController = require('../controllers/home');
const authController = require('../controllers/auth');
const hotelController = require('../controllers/hotel');
const notFoundController = require('../controllers/404');

const router = Router();

router.use('/', homeController);
router.use('/auth', authController);
router.use('/hotel', hotelController);

router.use('*', notFoundController);

module.exports = router;