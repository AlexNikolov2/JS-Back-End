
const { Router } = require('express');

const homeController = require('../controllers/home');
const authController = require('../controllers/auth');
const postController = require('../controllers/post');

const router = Router();

router.use('/', homeController);
router.use('/auth', authController);
router.use(postController);

module.exports = router;