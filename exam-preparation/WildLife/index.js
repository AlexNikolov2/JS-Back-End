const express = require('express');
const expressConfig = require('./config/express');
const session = require('express-session');
const databaseConfig = require('./config/database');
const routesConfig = require('./config/routes');

start();

async function start(){
    const app = express();

    expressConfig(app);
    await databaseConfig(app);
    app.get('/', (req, res) => res.render('home', {layout: 'false'}));

    app.listen(3000, () => {
        console.log('Servero krena bre');
    }
    );
}