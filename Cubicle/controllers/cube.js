const { Router } = require('express');

const cubeServices = require('../services/cube');
const accessoryServices = require('../services/accessory');
const { isCreator } = require('../middlewares/guards');
const { cookie_name } = require('../config');

const router = Router();

router.get('/create', (req, res) => {
    res.status(200).render('create', { title: 'Create cube' });
});

router.post('/create', async (req, res) => {
    try {
        const data = Object.assign({}, req.body, { creator: req[cookie_name]._id });
        await cubeServices.create(data);
        res.status(201).redirect('/');
    } catch (error) {
        req.body[`select${req.body.difficultyLevel}`] = true;
        const errorMSG = Object.values(error.errors).map(x => x.properties.message)[0];
        res.render('create', { title: 'Create', error: errorMSG, oldData: req.body });
    }
});

router.get('/details/:id', async (req, res) => {
    try {
        const cube = await cubeServices.getOneWithAccessories(req.params.id);
        cube.isCreator = req.user && cube.creator == req.user._id;
        res.status(200).render('details', { cube, title: 'Cubicle' });
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
});

router.get('/attach/:id', isCreator(), async (req, res) => {
    try {
        const cube = await cubeServices.getOneById(req.params.id);
        const accessories = await accessoryServices.getNotAttached(cube.accessories);
        res.status(200).render('attachAccessory', { cube, accessories });
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
});

router.post('/attach/:id', isCreator(), async (req, res) => {
    try {
        await cubeServices.attachAccessory(req.params.id, req.body.accessory);
        res.status(200).redirect('/cube/details/' + req.params.id);
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
});

router.get('/edit/:id', isCreator(), async (req, res) => {
    const cube = await cubeServices.getOneById(req.params.id);
    cube[`select${cube.difficultyLevel}`] = true;
    res.status(200).render('editCube', { title: 'Edit cube', cube });
});

router.post('/edit/:id', isCreator(), async (req, res) => {
    const cubeId = req.params.id;
    await cubeServices.edit(req.body, cubeId);
    res.redirect(`/cube/details/${cubeId}`);
});

router.get('/delete/:id', isCreator(), async (req, res) => {
    const cube = await cubeServices.getOneById(req.params.id);
    cube[`select${cube.difficultyLevel}`] = true;
    res.status(200).render('deleteCube', { title: 'Delete cube', cube });
});

router.post('/delete/:id', isCreator(), async (req, res) => {
    await cubeServices.deleteCube(req.params.id);
    res.redirect('/');
});

module.exports = router;