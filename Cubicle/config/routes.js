
const { Router } = require('express');

const homeController = require('../controllers/home');
const cubeController = require('../controllers/cube');
const accessoryController = require('../controllers/accessory');
const authController = require('../controllers/auth');
const notFoundController = require('../controllers/404');

const router = Router();

router.use('/', homeController);
router.use('/cube', cubeController);
router.use('/accessory', accessoryController);
router.use('/auth', authController);
router.get('*', notFoundController);

module.exports = router;