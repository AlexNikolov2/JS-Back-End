const router = require("express").Router();
const { getLastThree } = require("../services/house");

router.get('/', async (req, res) =>{
    const housings = await getLastThree();
    res.render('home', {housings});
});

module.exports = router;