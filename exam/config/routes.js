
const authController = require('../controllers/auth');
const homeController = require('../controllers/home');
const adController = require('../controllers/ad');

module.exports = (app) => {
    app.use(authController);
    app.use(homeController);
    app.use(adController);

    app.get('*', (req, res) => {
        res.status(404).render('404', { title: '404 Page' });
    });
};