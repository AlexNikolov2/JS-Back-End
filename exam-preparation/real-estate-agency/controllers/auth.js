const router = require('express').Router();
const {isGuest, isAuth} = require('../middlewares/auth');
const authService = require('../services/auth');

const {cookie_name}=require('../config');

router.get('/login', isGuest, (req, res)=>{
    res.render('auth/login');
});

router.post('/login', isGuest, async (req, res)=>{
    const {username, password} = req.body;

    try{
        let token = await authService.login({username, password});
        res.cookie(cookie_name, token);
        res.redirect('/');
        
    }
    catch(err){
        res.end();
    }
});

router.get('/register', isGuest, (req, res)=>{
    res.render('auth/register');
});


router.post('/register', isGuest, async (req, res)=>{
    const{name, username, password, rePassword} = req.body;
    if(password !== rePassword){
        res.locals.error = 'Password mismatch';
        return res.render('auth/register');
    }
    try{
        await authService.register({name, username, password});

        let token = await authService.login({
            username, 
            password
        });
        
        res.cookie(cookie_name, token);

        res.redirect('/');

    }
    catch (err) {
        let errorMSG = '';

        if (error.name === 'MongoError' && error.code === 11000) {
            errorMSG = 'Username or email already exists!';
        } else if (error.errors) {
            errorMSG = Object.values(error.errors).map(x => x.properties.message)[0];
        } else {
            errorMSG = error.message;
        }

        res.render('register', { title: 'Register', error: errorMSG, oldData: { username, email } });
    }
});

router.get('/logout', isAuth, (req, res)=>{
    res.clearCookie(cookie_name);
    res.redirect('/');
});

module.exports = router;