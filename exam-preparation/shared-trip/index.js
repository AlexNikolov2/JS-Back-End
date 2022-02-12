const express = require('express');

const expressSetup = require('./config/express');
const mongooseSetup = require('./config/database');

const start = async () => {
    const app = express();
    expressSetup(app);
    await mongooseSetup();

    app.listen(3000, () => console.log('Servero krena na 3000!'));
};

start();