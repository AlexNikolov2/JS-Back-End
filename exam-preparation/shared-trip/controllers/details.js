const { Router } = require('express');

const { isAuth } = require('../middlewares/guards');
const tripService = require('../services/tripService');

const router = Router();

router.get('/:id/details', async (req, res) => {
    try {
        const trip = await tripService.getById(req.params.id);
        if (trip.buddies.length > 0) {
            trip.buddiesString = trip.buddies.map(x => x.email).join(', ');
        }
        if (req.user) {
            trip.isCreator = req.user._id == trip.creator._id;
            trip.isJoined = trip.buddies.some(x => x._id == req.user._id);
        }
        trip.hasSeats = trip.seats > 0;
        res.render('trip/details', { title: 'Details', trip });
    } catch (error) {
        console.log(error);
        res.render('notFound', { title: 'Error' });
    }

});

router.get('/:id/join', isAuth(), async (req, res) => {
    try {
        const trip = await tripService.joinTrip(req.params.id, req.user._id);
        res.redirect(`/trips/${req.params.id}/details`);
    } catch (error) {
        console.log(error);
        res.render('notFound', { title: 'Error' });
    }
});


module.exports = router;