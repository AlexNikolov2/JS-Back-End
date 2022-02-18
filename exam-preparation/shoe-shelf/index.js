const express = require('express');

const config = require('./config');
const expressSetup = require('./config/express');
const databaseSetup = require('./config/database');

async function start() {
    
    const app = express();
    await expressSetup(app);

    await databaseSetup();
    app.listen(config.port, () => {
        console.log(`Servero krenuva qko na port ${config.port}`);
    });
}

start();