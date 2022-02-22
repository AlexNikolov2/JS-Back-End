
const { Router } = require('express');
const { body, validationResult } = require('express-validator');

const authService = require('../services/user');
const postService = require('../services/post');
const { cookie_name } = require('../config');
const { isGuest, isAuth } = require('../middlewares/guards');

const router = Router();

router.get('/login', isGuest(), (req, res) => {
    res.render('login', { title: 'Login' });
});

router.get('/register', isGuest(), (req, res) => {
    res.render('register', { title: 'Register' });
});

router.post('/login',
    isGuest(),
    body('email')
        .trim()
        .isEmail().withMessage('Invalid email!'),
    body('password')
        .trim()
        .isLength({ min: 4 }).withMessage('Password must be at least 4 characters long!'),
    async (req, res) => {
        const { email, password } = req.body;

        try {
            const errors = validationResult(req).array().map(x => x.msg);

            if (errors.length > 0) {
                throw new Error(errors.join('\n'));
            }

            const token = await authService.login(email, password);
            res.cookie(cookie_name, token);
            res.redirect('/');
        } catch (error) {
            res.render('login', { title: 'Login', errors: error.message.split('\n'), oldData: email });
        }
    });

router.post('/register',
    isGuest(),
    body('firstName').
    trim().isLength({ min: 3 }).withMessage('First name must be at least 3 characters long!'),
    body('lastName').trim().isLength({ min: 5 }).withMessage('Last name must be at least 5 characters long!'),
    body('email')
        .trim()
        .isEmail().withMessage('Invalid email!'),
    body('password')
        .trim()
        .isLength({ min: 4 }).withMessage('Password must be at least 4 characters long!'),
    body('password')
        .trim()
        .custom((value, { req }) => {
            if (value && value !== req.body.repass) {
                throw new Error('Passwords don`t match!');
            }
            return true;
        }),
    async (req, res) => {
        const { firstName, lastName, email, password } = req.body;

        try {
            const errors = validationResult(req).array().map(x => x.msg);

            if (errors.length > 0) {
                throw new Error(errors.join('\n'));
            }

            await authService.register( firstName, lastName, email, password);
            const token = await authService.login(email, password);
            res.cookie(cookie_name, token);
            res.redirect('/');
        } catch (error) {
            console.log(error.message);
            res.render('register', { title: 'Register', errors: error.message.split('\n'), oldData: req.body });
        }
    });

router.get('/logout', isAuth(), (req, res) => {
    res.clearCookie(cookie_name);
    res.redirect('/');
});


router.get('/profile/:id', isAuth(), async (req, res) => {
    try {
        const user = await authService.getProfile(req.params.id);
        const post = await postService.getPostsByCreator(req.params.id);
        user.hasCreated = post.length > 0;
        user.createdpost = post;
        res.render('my-posts', { title: 'Profile', user });
    } catch (error) {
        console.log(error);
        res.render('error', { title: 'Error' });
    }
});

module.exports = router;