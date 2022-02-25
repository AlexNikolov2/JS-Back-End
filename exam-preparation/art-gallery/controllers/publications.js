
const router = require('express').Router();

const { isUser, isOwner } = require('../middlewares/guards');
const preload = require('../middlewares/preload');
const { createPublication, updatePublication, deleteById } = require('../services/publications');
const mapErrors = require('../middlewares/mappers');


router.get('/create', isUser(), (req, res) => {
    res.render('create', { title: 'Create Page', data: {} });
});

router.post('/create', isUser(), async (req, res) => {
    const publication = {
        title: req.body.title,
        technique: req.body.technique,
        picture: req.body.picture,
        certificate: req.body.certificate,
        owner: req.session.user._id
    };

    try {
        await createPublication(publication);
        res.redirect('/catalog');
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        res.render('create', { title: 'Create Page', data: publication, errors });
    }
});

router.get('/edit/:id', preload(), isOwner(), (req, res) => {
    res.render('edit', { title: 'Edit Page' });
});

router.post('/edit/:id', preload(), isOwner(), async (req, res) => {
    const id = req.params.id;

    const publication = {
        title: req.body.title,
        technique: req.body.technique,
        picture: req.body.picture,
        certificate: req.body.certificate,
    };

    try {
        await updatePublication(id, publication);
        res.redirect('/catalog/' + id);
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        publication._id = id;
        res.render('edit', { title: 'Edit Page', data: publication, errors });
    }
});

router.get('/delete/:id', preload(), isOwner(), async (req, res) => {
    await deleteById(req.params.id);
    res.redirect('/catalog');
});

module.exports = router;