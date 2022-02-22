const router = require('express').Router();
const houseService = require('../services/house');
const { isAuth } = require('../middleware/authMiddleware');

router.get('/create', isAuth, (req, res) => {
    res.render('create', { title: 'Create House' });
});

router.post('/create', isAuth, async (req, res) => {
 const {name, type, year, city, homeImage, description, availablePieces} = req.body;
  await houseService.create({name, type, year, city, homeImage, description, availablePieces, owner: req.user._id});

  res.redirect('/housing');
});

module.exports = router;
