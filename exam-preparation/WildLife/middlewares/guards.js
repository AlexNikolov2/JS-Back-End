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


module.exports = {
    isAuth,
    isGuest,
};