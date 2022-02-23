const router = require("express").Router();
const authService = require("../services/auth");
const { isGuest } = require("../middlewares/authMiddleware");

router.get("/register", isGuest, (req, res) => {
    res.render("register", { title: "Register Page" });
});

router.post("/register", async (req, res) => {
    try {
        const { name, username, password, repeatPassword } = req.body;
        if (password != repeatPassword) {
            throw new Error("Password's don't matched!");
        }
        await authService.register({ name, username, password });
        res.redirect("/");

    } catch (errors) {
        return res.render("register", { errors });
    }

    res.redirect("/login");
});

module.exports = router;