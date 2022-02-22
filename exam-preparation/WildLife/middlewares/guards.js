const postService = require('../services/post');

const isAuth = () => {
    return (req, res, next) => {
        if (req.user !== undefined) {
            next();
        } else {
            res.redirect('/auth/login');
        }
    };
};

const isGuest = () => {
    return (req, res, next) => {
        if (req.user == undefined) {
            next();
        } else {
            res.redirect('/');
        }
    };
};

const isCreator = () => async (req, res, next) => {
    const post = await postService.getOneById(req.params.id);
    const isCreator = req.user && post.creator == req.user._id;

    if (!isCreator) {
        res.redirect('/');
        return;
    } 
    next();
};


module.exports = {
    isAuth,
    isGuest,
    isCreator
};