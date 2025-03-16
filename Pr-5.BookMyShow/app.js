const express = require('express');
const path = require('path');
const connectDB = require('./config/db');

const app = express();
connectDB();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/',express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: true }));

const homeRoutes = require('./routes/homeRoutes');
const adminRoutes = require('./routes/adminRoutes');
const bookingRoutes = require("./routes/bookingRoutes");

app.use('/', homeRoutes);
app.use('/admin', adminRoutes);
app.use("/bookings", bookingRoutes);

const PORT = 4444;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));