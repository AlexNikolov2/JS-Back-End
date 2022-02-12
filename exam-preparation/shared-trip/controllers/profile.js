const { Router } = require('express');
const authService = require('../services/authService');
const tripService = require('../services/tripService');
const { isAuth } = require('../middlewares/guards');

const router = Router();

router.get('/:id/profile', isAuth(), async (req, res) => {
    try {
        const user = await authService.getProfile(req.params.id);
        const trips = await tripService.getTripsByCreator(req.params.id);
        user.isMale = user.gender == 'male';
        user.hasCreated = trips.length > 0;
        user.createdTrips = trips;
        res.render('profile', { title: 'Profile', user });
    } catch (error) {
        console.log(error);
        res.render('notFound', { title: 'Error' });
    }
});

module.exports = router;