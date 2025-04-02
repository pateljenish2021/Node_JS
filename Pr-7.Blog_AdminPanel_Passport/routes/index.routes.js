const express = require("express");
const router = express.Router();
const indexController = require("../controllers/index.controller");

router.get("/", indexController.getDashboard);
router.get("/login", indexController.getLogin);
router.get("/dashboard", indexController.getDashboard);
router.get("/logout", indexController.logout);
router.get("/forgotpass", indexController.getForgotPasswordPage);
router.get("/otp", indexController.getOtpPage);
router.get("/newpass", indexController.getNewPasswordPage);
router.get("/change-password", indexController.getChangePasswordPage);


router.post("/login", indexController.postLogin);
router.post("/forgotpass", indexController.postForgotPassword);
router.post("/newpass", indexController.postNewPassword);
router.post("/otp", indexController.postOtpVerification);
router.post("/change-password", indexController.postChangePassword);

module.exports = router;