
const { Router } = require('express');

const homeController = require('../controllers/home');
const authController = require('../controllers/auth');
const shoeController = require('../controllers/shoe');

const router = Router();

router.use('/', homeController);
router.use('/auth', authController);
router.use('/shoe', shoeController);

module.exports = router;