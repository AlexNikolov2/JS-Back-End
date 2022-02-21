const { Router } = require('express');

const courseService = require('../services/course');

const router = Router();

router.get('/', async (req, res) => {
    let courses;
    if(req.user){
        if(req.query.course){
            courses = await courseService.getAllByName(req.query.course);
        }
        else{
            courses = await courseService.getAll();
        }
        res.render('home/user', {title: 'Home', courses: courses});
    }
    else{
        courses = await courseService.getTopThreeEnrolled();
        res.render('home/guest', {title: 'Home', courses: courses});
    }
});

module.exports = router;