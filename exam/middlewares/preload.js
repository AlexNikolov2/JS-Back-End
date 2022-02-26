
const { getById } = require('../services/ad');

function preload() {
    return async function (req, res, next) {
        const id = req.params.id;
        const data = await getById(id);
        res.locals.data = data;
        next();
    };
}

module.exports = preload;