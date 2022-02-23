const houseService = require("../services/house");

async function isOwner(req, res, next) {
    const house = await houseService.getById(req.params.houseId);
    if (house.owner == req.user._id) {
        next();
    } else {
        return res.redirect("/404");
    }
}

module.exports = isOwner;