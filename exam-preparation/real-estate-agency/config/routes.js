
const router = require("express").Router();
const homeController = require("./controllers/home");
const loginController = require("./controllers/login");
const registerController = require("./controllers/register");
const createController = require("./controllers/create");
const housingController = require("./controllers/housing");
const detailsController = require("./controllers/details");
const editController = require("./controllers/edit");
const searchController = require("./controllers/search");

router.use(homeController);
router.use(loginController);
router.use(registerController);
router.use(createController);
router.use(housingController);
router.use(detailsController);
router.use(editController);
router.use(searchController);

router.use("*", (req, res) => {
    res.render("404");
});
module.exports = router;