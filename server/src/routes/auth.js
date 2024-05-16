const express = require("express");
const router = express.Router();
const controllers = require("../controllers");

router.post("/signup", controllers.authController.signup);
router.post("/login", controllers.authController.login);
router.post("/logout", controllers.authController.logout);
router.post("/logoutall", controllers.authController.logoutAll);
router.post("/accessToken", controllers.authController.newAccessToken);
router.post("/refreshToken", controllers.authController.newRefreshToken);

module.exports = router;
