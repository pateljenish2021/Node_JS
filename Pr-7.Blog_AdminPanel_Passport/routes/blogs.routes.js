const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogs.controller");

const isAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/login");
    }
    next();
};

router.use(isAuthenticated);

router.get("/add-blog", blogController.getAddBlogPage);
router.get("/view-blogs", blogController.getViewBlogPage);
router.get("/all-blogs", blogController.getAllBlogsPage);
router.get("/:id", blogController.getSingleBlogPage);
router.get("/edit-blog/:id", blogController.getEditBlogPage);
router.get("/delete-blog/:id", blogController.deleteBlog);

router.post("/add-blog", blogController.postAddBlog);
router.post("/edit-blog/:id", blogController.postEditBlog);

module.exports = router;
