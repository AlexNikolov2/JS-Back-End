const router = require('express').Router();
const housingService = require('../services/house');

router.get('/', async (req, res)=>{
    let housings = await housingService.getTopHouses();
    res.render('home', {title: 'Home Page', housings});
});

router.get('/search', async(req, res)=>{
    let housings = await housingService.search(req.query.text);
    res.render('search', {title: 'Search Housing', housings});
});

module.exports = router;