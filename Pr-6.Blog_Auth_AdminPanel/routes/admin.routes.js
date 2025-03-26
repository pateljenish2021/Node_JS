const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");

router.use((req, res, next) => {
    if (!req.cookies.adminAuth) {
        return res.redirect("/login");
    }
    next();
});

// Routes
router.get("/add-admin", adminController.getAddAdminPage);
router.post("/add-admin", adminController.postAddAdmin);
router.get("/view-admin", adminController.getViewAdminPage);
router.get("/edit-admin/:id", adminController.getEditAdminPage);
router.post("/update-admin/:id", adminController.postUpdateAdmin);
router.get("/delete-admin/:id", adminController.deleteAdmin);

router.get("/view-profile", adminController.getViewProfile);
router.get("/logout", adminController.logoutAdmin);

module.exports = router;
