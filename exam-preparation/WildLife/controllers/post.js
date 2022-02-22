const {Router} = require('express');
const {body, validationResult} = require('express-validator');

const { isAuth, isCreator} = require('../middlewares/guards');
const postService = require('../services/post');

const router = Router();

router.get('/create', isAuth(), async (req, res) => {
    res.render('create', {title: 'Create post'});
});

router.post('/create', isAuth(),
    body('title').trim().isLength({min: 6}).withMessage('Title must be minimum 6 characters!'),
    body('keyword').trim().isLength({min: 6}).withMessage('keyword must be minimum 6 characters!'),
    body('location').trim().isLength({max: 15}).withMessage('Location must be minimum 6 characters!'),
    body('imageUrl').trim().matches(new RegExp('^https?')).withMessage('Image URL is invalid!'),
    body('description').trim().isLength({min: 8}).withMessage('Description must be minimum 8 characters!'),
 async (req, res) => {
    const data = {
        title: req.body.title,
        keyword: req.body.keyword,
        location: req.body.location,
        date: req.body.date,
        image: req.body.image,
        description: req.body.description,
        author: req.user._id
    };
    try {
        const errors = validationResult(req).array().map(x => x.msg);

        if (errors.length > 0) {
            throw new Error(errors.join('\n'));
        }

        await postService.create(data);
        res.redirect('/catalog');
    } catch (error) {
        data._id = req.params.id;
        res.render('create', {title: 'Create post', errors: error.message.split('\n'), post: data});
    }
});

router.get('/details/:id', isAuth(), async (req, res) => {
    try {
        const post = await postService.getById(req.params.id);
        if(post.votedUsers.length > 0){
            post.votedUsersString = trip.votedUsers.map(x => x.email).join(', ');
        }
        if(req.user){
            post.isCreator = post.author._id == req.user._id;
            post.isVoted = post.votedUsers.some(x => x._id == req.user._id);
        }
        res.render('details', {title: 'Details', post});

        } catch (error) {
        }
});

router.get('/vote/:id/:type', isAuth(), async (req, res) => {

    const id = req.params.id;
    const value = req.params.type == 'upvote' ? 1 : -1;

    try {
        const post = await postService.vote(id, value, req.user);
        res.redirect(`details/${id}`);
    } catch (error) {
        res.redirect(`details/${id}`);
    }
});

router.get('/edit/:id', isAuth(), isCreator(), async (req, res) => {
    try {
        const post = await postService.getById(req.params.id);
        res.render('edit', {title: 'Edit', post});
    } catch (error) {
        res.render('error', {title: 'Error', errors: error.message.split('\n')});
    }   
});

router.post('/edit/:id', isAuth(), isCreator(), async (req, res) => {
    const data = {
        title: req.body.title,
        keyword: req.body.keyword,
        location: req.body.location,
        date: req.body.date,
        image: req.body.image,
        description: req.body.description,
        author: req.user._id,
        votes: req.body.votes,
        rating: req.body.rating,       
    };

    try {
        const error = validationResult(req).array().map(x => x.msg);

        if (error.length > 0) {
            throw new Error(error.join('\n'));
        }

        await postService.update(req.params.id, data);
        res.redirect(`/details/${req.params.id}`);
    } catch (error) {
        data._id = req.params.id;
        res.render('edit', {title: 'Edit', errors: error.message.split('\n'), oldData: data});
    }
});

router.get('/delete/:id', isAuth(), isCreator(), async (req, res) => {
    try {
        await postService.delete(req.params.id);
        res.redirect('/');
    } catch (error) {
        res.render('error', {title: 'Error', errors: error.message.split('\n')});
    }
});

module.exports = router;