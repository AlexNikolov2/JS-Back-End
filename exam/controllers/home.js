const { isUser, isOwner } = require('../middlewares/guards');
const preload = require('../middlewares/preload');
const { getAll, getById , apply, getLastThree} = require('../services/ad');
const {getUserByEmail} = require('../services/user');

const router = require('express').Router();

router.get('/', async (req, res) => {
    const ads = await getLastThree();
    //ads.map(p => p.count = p.applied.length);
    res.render('home', { title: 'Home Page', ads });
});

router.get('/catalog', async (req, res) => {
    const ads = await getAll();
    res.render('all-ads', { title: 'All Ads', ads });
});

router.get('/catalog/:id', preload(), (req, res) => {
    const item = res.locals.data;

    if (req.session.user) {
        item.hasUser = true;
        item.isOwner = req.session.user?._id == item.owner._id;

        if (item.applied.some(u => u._id == req.session.user._id)) {
            item.isApplied = true;
        }
    }

    if(item.applied.length > 0){
        item.hasApplies = true;
        item.applied = item.applied.map(x => [x.email, x.skills]).join(', ');
    }

    res.render('details', { title: 'Details Page', data: item });
});

router.get('/apply/:id', isUser(), async (req, res) => {
    const id = req.params.id;

    try {
        await apply(id, req.session.user._id);
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

    res.locals.results = await getUserByEmail(search);
    res.locals.search = search;

    res.render('search', { title: 'Search Page' });
});

module.exports = router;