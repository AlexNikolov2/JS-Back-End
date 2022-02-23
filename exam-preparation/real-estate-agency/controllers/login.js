
const router = require("express").Router();
const authService = require("../services/auth");
const { cookie_name } = require('../config');
const { isAuth, isGuest } = require("../middlewares/authMiddleware");

router.get("/login", isGuest, (req, res) => {
    res.render("login", { title: "Login Page" });
});

router.post("/login", isGuest, async (req, res) => {
    const { username, password } = req.body;
    try {
        const token = await authService.login(username, password);
        res.cookie(cookie_name , token, { httpOnly: true });
        res.redirect("/");
    } catch (err) {
        console.log(err.message);

    }
});

router.get("/logout", isAuth, (req, res) => {
    res.clearCookie(cookie_name);

    res.redirect("/");
});

module.exports = router;