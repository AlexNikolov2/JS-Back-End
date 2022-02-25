const router = require('express').Router();
const { isGuest, isUser } = require('../middlewares/guards');
const { register, login } = require('../services/auth');
const { mapErrors } = require('../middlewares/mapper');

router.get('/register', isGuest(), (req, res) => {
    res.render('register', { title: 'Register Page' });
});

router.post('/register', isGuest(), async (req, res) => {
    const {email, password, repass, firstname, lastname} = req.body;

    try {
        if (password.trim() == '' || password.length < 4) {
            throw new Error('Password is required and must be at least 4 characters long');
        } else if (password != repass) {
            throw new Error('Passwords don\'t match');
        }

        const user = await register(firstname, lastname, email, password);
        req.session.user = user;
        res.redirect('/');
    } catch (err) {
        const errors = mapErrors(err);
        const data = {
            firstname,
            lastname,
            email
        };
        res.render('register', { title: 'Register Page', data, errors });
    }
});

router.get('/login', isGuest(), (req, res) => {
    res.render('login', { title: 'Login Page' });
});

router.post('/login', isGuest(), async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await login(email, password);
        req.session.user = user;
        res.redirect('/');
    } catch (err) {
        const errors = mapErrors(err);
        res.render('login', { title: 'Login Page', data: { email: email }, errors });
    }
});

router.get('/logout', isUser(), (req, res) => {
    delete req.session.user;
    res.redirect('/');
});

module.exports = router;