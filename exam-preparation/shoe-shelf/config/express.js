
const express = require('express');
const {create: handlebars} = require('express-handlebars');
const cookieParser = require('cookie-parser');

const routes = require('./routes');
const isLogged = require('../middlewares/isLogged');

module.exports = (app) => {
    app.engine('.hbs', handlebars({
        extname : '.hbs'
    }).engine);

    app.set('view engine', '.hbs');

    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(express.static('./static'));
    app.use(isLogged());

    app.use(routes);
};