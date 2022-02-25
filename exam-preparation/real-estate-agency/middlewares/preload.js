
const { getHouseById} = require('../services/housing');

function preload() {
    return async function (req, res, next) {
        const id = req.params.id;
        const data = await getHouseById(id);
        res.locals.data = data;
        next();
    };
}

module.exports = preload;