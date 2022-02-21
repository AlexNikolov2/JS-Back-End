
const { Router } = require('express');

const homeController = require('../controllers/home');
const authController = require('../controllers/auth');
const playController = require('../controllers/play');

const router = Router();

router.use('/', homeController);
router.use('/auth', authController);
router.use('/play', playController);

module.exports = router;