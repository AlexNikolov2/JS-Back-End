
const jwt = require('jsonwebtoken');
const { cookie_name, SECRET_TOKEN} = require('../config');

exports.auth = function(req, res, next){
    let token = req.cookies[cookie_name];

    if(token){
        jwt.verify(token, SECRET_TOKEN).then(decodedToken=>{
            req.user = decodedToken;
            res.locals.user = decodedToken; 
            next();
        }).catch(err=>{
            res.clearCookie(cookie_name);  
            res.redirect('/auth/login');
        });

    }else{
        next();
    }
};

exports.isAuth = function(req, res, next) {
    if(req.user){
        next();
    }else{
        res.redirect('/auth/login');
    }
};

exports.isGuest = function(req, res, next){
    if(!req.user){
        next();
    }else{
        res.redirect('/');
    }
};