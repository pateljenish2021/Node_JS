const express = require("express");
const router = express.Router();
const indexController = require("../controllers/index.controller");

router.get("/", indexController.getDashboard);
router.get("/login", indexController.getLogin);
router.post("/login", indexController.postLogin);
router.get("/dashboard", indexController.getDashboard);
router.get("/logout", indexController.logout);
router.get("/forgotpass", indexController.getForgotPasswordPage);
router.post("/forgotpass", indexController.postForgotPassword);
router.get("/otp", indexController.getOtpPage);
router.post("/otp", indexController.postOtpVerification);
router.get("/newpass", indexController.getNewPasswordPage);
router.post("/newpass", indexController.postNewPassword);

module.exports = router;