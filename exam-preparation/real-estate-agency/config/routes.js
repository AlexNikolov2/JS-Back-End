
const router = require('express').Router();

const homeController = require('../controllers/home');
const authController = require('../controllers/auth');
const housingController = require('../controllers/housing');

router.use('/', homeController);
router.use('/auth', authController);
router.use('/housing', housingController);
router.use('*', (req, res)=>{
    res.render('404');
});


module.exports = router;