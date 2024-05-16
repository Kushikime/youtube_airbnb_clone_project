const express = require("express");
const router = express.Router();
const controllers = require("../controllers");
const tmp = (req, res) => {};

router.post("/signup", controllers.authController.signup);
router.post("/login", tmp);
router.post("/logout", tmp);
router.post("/accessToken", tmp);
router.post("/refreshToken", tmp);

module.exports = router;
