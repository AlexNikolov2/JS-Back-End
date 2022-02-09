const mongoose = require('mongoose');

require('./Car');
require('./Accessory');

const connectionString = 'mongodb://localhost:27017/carbicle';

async function init(){
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false
        });
        console.log('Eeee, svrzaame te so bazata');

        mongoose.connection.on('error', (err) => {
            console.error('Stana fal vo bazata');
            console.error(err);
        });
    }
    catch (err) {
        console.error('Ne mozavme da te svrzime so bazata');
        console.log(err);
        process.exit(1);
    }
    
}

module.exports = init;