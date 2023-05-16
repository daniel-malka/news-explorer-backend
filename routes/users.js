const router = require("express").Router();
//require all validators

const { getUserInfo } = require("../controllers/users");

router.get("/", getUserInfo);

module.exports = { UserRouter: router };
