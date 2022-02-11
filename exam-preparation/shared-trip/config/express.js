const express = require('express');
const hbs = require('express-handlebars');
const cookieParser = require('cookie-parser');

module.exports = (app) => {
    app.engine('hbs', hbs({
        extname: '.hbs'
    }).engine);
    app.set('view engine', 'hbs');

    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use('/static', express.static('static'));
    app.use(session({
        secret: '20 leva davam kucheka da prodaljava',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: 'auto' }
    }));
};