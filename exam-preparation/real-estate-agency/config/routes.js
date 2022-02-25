
const authController = require('../controllers/auth');
const homeController = require('../controllers/home');
const housingController = require('../controllers/housing');
// TODO add other controllers....

module.exports = (app) => {
    app.use(authController);
    app.use(homeController);
    app.use(housingController);

    app.get('*', (req, res) => {
        res.status(404).render('404', { title: 'Not Found Page' });
    });
};