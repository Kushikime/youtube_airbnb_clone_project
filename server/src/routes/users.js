const express = require("express");
const router = express.Router();
const controllers = require("../controllers");
const middlewares = require("../middlewares");

router.get(
  "/me",
  middlewares.verifyAccessToken,
  controllers.usersController.me
);

module.exports = router;
