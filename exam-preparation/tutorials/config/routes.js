
const { Router } = require('express');

const homeController = require('../controllers/home');
const authController = require('../controllers/auth');
const courseController = require('../controllers/course');

const router = Router();

router.use('/', homeController);
router.use('/auth', authController);
router.use('/course', courseController);

module.exports = router;