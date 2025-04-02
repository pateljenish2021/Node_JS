const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");

const isAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/login");
    }
    next();
};

router.use(isAuthenticated);

router.get("/add-admin", adminController.getAddAdminPage);
router.get("/view-admin", adminController.getViewAdminPage);
router.get("/edit-admin/:id", adminController.getEditAdminPage);
router.get("/delete-admin/:id", adminController.deleteAdmin);
router.get("/view-profile", adminController.getViewProfile);

router.post("/add-admin", adminController.postAddAdmin);
router.post("/update-admin/:id", adminController.postUpdateAdmin);

module.exports = router;
