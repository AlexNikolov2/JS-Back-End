const {isUser, isOwner} = require('../middlewares/guards');
const preload = require('../middlewares/preload');
const {getLastThree, getAll, joinRent, getByType} = require('../services/housing');

const router = require('express').Router();

router.get('/',  async (req, res) => {
    const houses = await getLastThree();
    res.render('home', { title: 'Home Page', houses});
});

router.get('/catalog', async (req, res) => {
    const houses = await getAll();
    res.render('catalog', { title: 'Catalog Page', houses});
});

router.get('/catalog/:id', preload(true), (req, res) => {
    const house = res.locals.data;
    house.remainingRent = house.pieces - house.renters.length;

    if (req.session.user) {
        house.hasUser = true;
        house.isOwner = req.session.user?._id == house.owner._id;

        if (house.renters.some(b => b._id == req.session.user._id)) {
            house.isJoined = true;
        }
    }

    house.rentersNames = [];
    if (house.renters) {
        house.renters.forEach(r => house.rentersNames.push(r.name));
    }
    house.rentersNames = house.rentersNames.join(', ');

    res.render('details', { title: 'Details Page', data: house });
});

router.get('/rent/:id', isUser(), async (req, res) => {
    const id = req.params.id;

    try {
        await joinRent(id, req.session.user._id);
    } catch (err) {
        console.error(err);
    } finally {
        res.redirect('/catalog/' + id);
    }

});

router.get('/search', isUser(), (req, res) => {
    res.render('search', { title: 'Search Page' });
});

router.post('/search', isUser(), async (req, res) => {
    const search = req.body.search;

    res.locals.results = await getByType(search);
    res.locals.search = search;

    res.render('search', { title: 'Search Page' });
});

module.exports = router;