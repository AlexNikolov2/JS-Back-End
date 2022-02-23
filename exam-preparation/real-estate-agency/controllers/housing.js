
const router = require("express").Router();
const { getAll } = require("../services/house");

router.get("/housing", async (req, res) => {
    const housings = await getAll();
    res.render("housing", { title: "Housing For Rent", housings });
});

module.exports = router;