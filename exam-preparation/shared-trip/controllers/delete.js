
const { Router } = require('express');

const { isAuth, isCreator } = require('../middlewares/guards');
const tripService = require('../services/tripService');

const router = Router();

router.get('/:id/delete', isAuth(), isCreator(), async (req, res) => {
    try {
        await tripService.deleteTrip(req.params.id);
        res.redirect('/trips');
    } catch (error) {
        console.log(error);
        res.render('notFound', { title: 'Error' });
    }
});