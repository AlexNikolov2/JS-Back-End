const {isUser, isGuest} = require('../middlewares/guards');
const {login, register} = require('../services/user');
const mapErrors  = require('../middlewares/mappers');
const { route } = require('./home');

const router = require('express').Router();

router.get('/register', isGuest, (req, res)=>{
    res.render('register', { title: 'Register Page'});
});

router.post('/register', isGuest, async (req, res) => {
    try{
        if(req.body.password.trim().length < 4){
            throw new Error('Password must be at least 4 characters long');
        }
        if(req.body.password !== req.body.repass){
            throw new Error('Passwords do not match');
        }
        const user = await register(req.body.name, req.body.username, req.body.password);
        req.session.user = user;
        res.redirect('/');
    }
    catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        res.render('register',  {data: {name: req.body.name, username: req.body.username}, errors, title: 'Register Page'});
    }
});

router.get('/login', isGuest(), (req, res)=>{
    res.render('login', {title: 'Login Page'});
});

router.post('/login', isGuest(), async (req, res)=>{
    try{
        const user = await login(req.body.username, req.body.password);
        req.session.user = user;
        res.redirect('/');
    }
    catch(err){
        console.error(err);
        const errors = mapErrors(err);
        res.render('login', {data: {username: req.body.username}, errors, title: 'Login Page'});
    }
});

router.get("/logout", isUser(), (req, res)=>{
    delete req.session.user;
    res.redirect('/');
    });

    module.exports = router;

