
const router = require("express").Router();
const houseService = require("../services/house");
const isOwner = require("../middlewares/housingMiddleware");

router.get("/details/:houseId", async (req, res) => {
    try {
        let house = await houseService.getById(req.params.houseId);
        const isOwner = house.owner == req.user?._id;
        const isRented = house.tenants.some(t => t._id == req.user?._id);
        const isAvailable = house.availablePieces > 0;
        const tenants = await house.getTenants();

        house = house.toObject();

        res.render("details", { house, isOwner, tenants, isRented, isAvailable });
    } catch (err) {
        console.log(err.message);
    }

});

router.get("/rent/:houseId", isOwner, async (req, res) => {
    try {
        await houseService.rentHouse(req.params.houseId, req.user._id);

        res.redirect(`/details/${req.params.houseId}`);

    } catch (err) {
        console.log(err.message);
    }

});



module.exports = router;