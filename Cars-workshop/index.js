const express = require('express');
const hbs = require('express-handlebars');

const initDb = require('./models');

const carsService = require('./services/cars');
const accessoryService = require('./services/accessory');

const { home } = require('./controllers/home');
const { about } = require('./controllers/about');
const create = require('./controllers/create');
const { details } = require('./controllers/details');
const edit = require('./controllers/edit');
const deleteCar = require('./controllers/delete');
const accessory = require('./controllers/accessory');
const attach = require('./controllers/attach');

const { notFound } = require('./controllers/404');

start();

async function start() {
    await initDb();

    const app = express();

    app.engine('hbs', hbs.create({
        extname: '.hbs'
    }).engine);
    app.set('view engine', 'hbs');

    app.use(express.urlencoded({ extended: true }));
    app.use('/static', express.static('static'));
    app.use(carsService());
    app.use(accessoryService());

    app.get('/', home);
    app.get('/about', about);
    app.get('/details/:id', details);

    app.route('/create')
        .get(create.get)
        .post(create.post);

    app.route('/delete/:id')
        .get(deleteCar.get)
        .post(deleteCar.post);

    app.route('/edit/:id')
        .get(edit.get)
        .post(edit.post);
        
    app.route('/accessory')
        .get(accessory.get)
        .post(accessory.post);

    app.route('/attach/:id')
        .get(attach.get)
        .post(attach.post);

    app.all('*', notFound);

    app.listen(3000, () => console.log('Server started on port 3000\n Nema zadna has mo kar'));
}