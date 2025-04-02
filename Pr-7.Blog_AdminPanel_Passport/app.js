const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('./config/passport'); 
const indexRoutes = require('./routes/index.routes');
const adminRoutes = require('./routes/admin.routes');
const blogRoutes = require('./routes/blogs.routes');

const app = express();
connectDB();

app.use(session({
    secret: "admin",
    resave: false,              
    saveUninitialized: false,  
    cookie: { 
        maxAge: 3600000, 
        httpOnly: true 
    }
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
    res.locals.admin = req.isAuthenticated() ? req.user : null;
    next();
});

app.use('/', indexRoutes);
app.use('/admin', adminRoutes);
app.use('/blogs', blogRoutes);

const PORT = 4444;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));