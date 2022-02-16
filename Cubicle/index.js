
const express = require('express');

const config = require('./config');
const expressSetup = require('./config/express');
const mongooseSetup = require('./config/database');

const app = express();
expressSetup(app);
mongooseSetup();

app.listen(config.port, () => console.log('Servero krenuva na port 3000, stegajte djameto!'));