const jwt = require('jsonwebtoken');
const cookieName = 'user';
const secret = 'djami e najdobriot';

module.exports = () => (req, res, next) => {
    const token = req.cookies[cookieName];
    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        res.locals = decoded;
        res.locals.isLogged = true;
    } catch (error) {
        res.clearCookie(cookieName);
    }

    next();
};