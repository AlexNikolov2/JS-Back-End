
const express = require('express');
const {create: handlebars} = require('express-handlebars');
const cookieParser = require('cookie-parser');

const routes = require('./routes');
const {auth} = require('../middlewares/auth');

module.exports = (app) => {
    app.engine('.hbs', handlebars({
        extname : '.hbs'
    }).engine);

    app.set('view engine', '.hbs');

    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(express.static('./static'));
    app.use(auth);

    app.use(routes);
};