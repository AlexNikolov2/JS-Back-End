const express = require('express');
const {create: handlebars} = require('express-handlebars');
app.engine('hbs', handlebars({
    extname: '.hbs'
}).engine);
app.set('view engine', 'hbs');

app.use(session({
    secret: '20 leva davam kucheka da prodaljava',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'auto' }
}));
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('static'));