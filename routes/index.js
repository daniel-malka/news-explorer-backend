//routers
const router = require("express").Router();
const { UserRouter } = require("./users");
const { ArticleRouter } = require("./article");
const nonRoute = require("./nonRoute");
//authentication middlwares
const auth = require("../middlewars/auth");
//controllers
const { createUser, login } = require("../controllers/users");

//signup and signin before auth

router.post("/signup", createUser);
router.post("/signin", login);

router.use(auth);

router.use("/users", UserRouter);
router.use("/article", ArticleRouter);
router.use("*", nonRoute);

module.exports = { router };
