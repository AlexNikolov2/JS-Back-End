const mongoose = require('mongoose');

require('./Car');
require('./Accesory');

const connectionString = 'mongodb://localhost:27017/carbicle';

async function init(){
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        mongoose.connection.on('error', (err) => {
            console.error(err)
        });
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
    
}

module.exports = init;