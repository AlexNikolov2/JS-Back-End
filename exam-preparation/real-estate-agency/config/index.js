
const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 3000,
        db_connection: 'mongodb://localhost/estate',
        cookie_name: 'user',
        secret: 'very strong secret',
        salt_rounds: 10,
        SECRET_TOKEN: "eyJhbGciOiJIUzI1NiJ9.joxNjQ0NjA3OTE5xmXpyvqnaLcthJUVp18"
    },
    production: {}
};

module.exports = config[env];