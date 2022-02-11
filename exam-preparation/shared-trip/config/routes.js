const {Router} = require('express');

const homeController = require('../controllers/home');
const authController = require('../controllers/auth');
const createController = require('../controllers/create');
const detailsController = require('../controllers/details');
const editController = require('../controllers/edit');
const deleteController = require('../controllers/delete');
const notFound = require('../controllers/404');

const router = new Router();

router.use('/', homeController);
router.use('/auth', authController);
router.use('/create', createController);
router.use('/details', detailsController);
router.use('/edit', editController);
router.use('/delete', deleteController);
router.use('*', notFound);

module.exports = router;

