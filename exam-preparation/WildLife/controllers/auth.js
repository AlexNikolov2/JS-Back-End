const {Router} = require('express');

const router = Router();
router.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});
router.post('/register', 
    body('username').trim(),
    body('password').trim(),
    body('repeatPassword').trim(),
    body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long be pedal').isAlphanumeric().withMessage('Username must be alphanumeric, demek samo bukvi i cifri be prostak'),
    body('password').isLength({ min: 3 }).withMessage('Password must be at least 3 characters long be pedal').isAlphanumeric().withMessage('Password must be alphanumeric, demek samo bukvi i cifri be prostak'),
    body('repeatPassword').custom((value, {req}) => value == req.body.password).withMessage('Passwords must match'),
    async (req, res) => {
        const errors = validationResult(req);

        try{
            if(errors.length > 0){
                throw errors;
            }
            await req.auth.register(req.body.username, req.body.password);
            res.redirect('/');
        }
        catch(err){
            res.locals.errors = mapError(err);
            res.render('register', { title: 'Register', data: {username: req.body.username} });
        }
    });
router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});
module.exports = router;