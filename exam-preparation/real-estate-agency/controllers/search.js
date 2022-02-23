
const router = require("express").Router();
const houseService = require("../services/house");

router.get("/search", async (req, res) => {
    const housings = await houseService.search(req.query.search);
    res.render("search", { housings });
});

module.exports = router;