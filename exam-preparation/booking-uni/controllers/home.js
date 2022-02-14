const { Router } = require('express');

const hotelService = require('../services/hotel');

const router = Router();

router.get('/', async (req, res) => {
    const hotels = await hotelService.getAll();
    res.render('home', { title: 'Home', hotels });
});

module.exports = router;