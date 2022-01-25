const express = require('express');
const hbs = require('express-handlebars');

const cubesService = require('./services/cubes');

const {home} = require('./controllers/home');
const {about} = require('./controllers/about');
const create = require('./controllers/create');
const {details} = require('./controllers/details');
const {notFound} = require('./controllers/404');

const app = express();

app.engine('hbs', hbs.create({
    extname: 'hbs',
}).engine);
app.set('view engine', 'hbs');

app.use(express.urlencoded({extended: true}));
app.use('/static/', express.static('static'));
app.use(cubesService());

app.get('/', home);
app.get('/about', about);
app.get('/details/:id', details);

app.route('/create')
    .get(create.get)
    .post(create.post);

app.all('*', notFound);

app.listen(3000, () => console.log('Server started on port 3000\nNema zadna varvi qko \n ajde Djamajka lesgo'));