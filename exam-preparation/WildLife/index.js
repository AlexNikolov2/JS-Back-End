
const express = require('express');
const handlebars = require('express-handlebars');
const session = require('express-session');
const database = require('./config/database');
const routesConfig = require('./config/routes');
const userSession = require('./middlewares/session');

start();

async function start() {
    const app = express();
    app.engine('.hbs', handlebars.create({
        extname: '.hbs'
    }).engine);
    app.set('view engine', 'hbs');

    app.use(session({
        secret: 'djami for life',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: 'auto' }
    }));
    app.use(express.urlencoded({ extended: true }));
    app.use('/static', express.static('static'));
    app.use(userSession());


    await database(app);
    routesConfig(app);
    app.get('*', (req, res) => {
        res.render('404', {title: 'Not Found'});
    });
    app.listen(3000, () => console.log('Server started on port 3000'));
}