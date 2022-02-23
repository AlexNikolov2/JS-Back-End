const jwt = require("jsonwebtoken");
const {SECRET_TOKEN} = require("../config"); 

function authMiddleware(req, res, next) {
    const token = req.cookies["app-token"];

    if (token) {
        try {
            const decodedToken = jwt.verify(token, SECRET_TOKEN);
            req.user = decodedToken;
            res.locals.user = decodedToken;
        } catch (err) {
            res.clearCookie("app-token");
            res.status(401).render("404");
        }

    }
    next();
}

function isAuth(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect("/login");
    }
}

function isGuest(req, res, next) {
    if (!req.user) {
        return next();
    }
    res.redirect('/404');
}
module.exports = {
    authMiddleware,
    isAuth,
    isGuest
};