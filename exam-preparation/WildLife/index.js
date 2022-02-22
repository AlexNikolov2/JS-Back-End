const express = require('express');

const config = require('./config');
const expressSetup = require('./config/express');
const mongooseSetup = require('./config/database');

const start = async () => {
    const app = express();
    expressSetup(app);
    await mongooseSetup();

    app.listen(config.port, () => console.log(`Servero krena na ${config.port}!`));
};

start();