//change name!


const router = require('express').Router();

const { isUser, isOwner } = require('../middlewares/guards');
const preload = require('../middlewares/preload');
const { create, update, deleteById } = require('../services/ad');
const mapErrors = require('../middlewares/mappers');


router.get('/create', isUser(), (req, res) => {
    res.render('create', { title: 'Create Page', data: {} });
});

router.post('/create', isUser(), async (req, res) => {
    const ad = {
        headline: req.body.headline,
        location: req.body.location,
        companyName: req.body.companyName,
        companyDescription: req.body.companyDescription,
        owner: req.session.user._id
    };

    try {
        await create(ad);
        res.redirect('/catalog');
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        res.render('create', { title: 'Create Page', data: ad, errors });
    }
});

router.get('/edit/:id', preload(), isOwner(), (req, res) => {
    res.render('edit', { title: 'Edit Page' });
});

router.post('/edit/:id', preload(), isOwner(), async (req, res) => {
    const id = req.params.id;

    const ad = {
        headline: req.body.headline,
        location: req.body.location,
        companyName: req.body.companyName,
        companyDescription: req.body.companyDescription,
        owner: req.session.user._id
    };

    try {
        await update(id, ad);
        res.redirect('/catalog/' + id);
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        ad._id = id;
        res.render('edit', { title: 'Edit Page', data: ad, errors });
    }
});

router.get('/delete/:id', preload(), isOwner(), async (req, res) => {
    await deleteById(req.params.id);
    res.redirect('/catalog');
});

module.exports = router;