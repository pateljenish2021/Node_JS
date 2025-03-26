const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const Admin = require("./models/admin.model");
const indexRoutes = require('./routes/index.routes');
const adminRoutes = require('./routes/admin.routes');
const blogRoutes = require('./routes/blogs.routes');
const app = express();

connectDB();
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/',express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
    if (req.cookies.adminAuth) {
        try {
            const admin = await Admin.findById(req.cookies.adminAuth);
            res.locals.admin = admin || null;
        } catch (error) {
            res.locals.admin = null;
        }
    } else {
        res.locals.admin = null;
    }
    next();
});

app.use('/', indexRoutes);;
app.use('/admin', adminRoutes);
app.use('/blogs', blogRoutes);

const PORT = 4444;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));