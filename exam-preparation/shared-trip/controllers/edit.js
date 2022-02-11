const { Router } = require('express');
const { body, validationResult } = require('express-validator');

const { isAuth, isCreator } = require('../middlewares/guards');
const tripService = require('../services/tripService');

const router = Router();

router.get('/:id/edit', isAuth(), isCreator(), async (req, res) => {
    try {
        const trip = await tripService.getById(req.params.id);
        res.render('trip/edit', { title: 'Edit', trip });
    } catch (error) {
        console.log(error);
        res.render('notFound', { title: 'Error' });
    }
});

router.post('/:id/edit',
    isAuth(),
    isCreator(),
    body('startPoint').trim().isLength({ min: 4 }).withMessage('Start point must be at least 4 characters long!'),
    body('endPoint').trim().isLength({ min: 4 }).withMessage('End point must be at least 4 characters long!'),
    body('seats').isInt({ min: 0, max: 4 }).withMessage('Seats must be between 0 and 4!'),
    body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters long!'),
    body('carImage').trim().matches(new RegExp('^https?')).withMessage('Car image URL is invalid!'),
    body('price').isInt({ min: 1, max: 50 }).withMessage('Price must be between 1 and 50!'), async (req, res) => {
        const data = {
            startPoint: req.body.startPoint.trim(),
            endPoint: req.body.endPoint.trim(),
            date: req.body.date.trim(),
            time: req.body.time.trim(),
            carImage: req.body.carImage.trim(),
            carBrand: req.body.carBrand.trim(),
            seats: Number(req.body.seats),
            price: Number(req.body.price),
            description: req.body.description.trim(),
            creator: req.user._id
        };
        try {
            const errors = validationResult(req).array().map(x => x.msg);

            if (errors.length > 0) {
                throw new Error(errors.join('\n'));
            }

            await tripService.editTrip(req.params.id, data);
            res.redirect(`/trips/${req.params.id}/details`);
        } catch (error) {
            console.log(error);
            data._id = req.params.id;
            res.render('trip/edit', { title: 'Edit', errors: error.message.split('\n'), trip: data });
        }
    });