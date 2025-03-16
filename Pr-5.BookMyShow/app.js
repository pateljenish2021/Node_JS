const express = require('express');
const path = require('path');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: true }));

// Routes
const homeRoutes = require('./routes/homeRoutes');
const adminRoutes = require('./routes/adminRoutes');
const bookingRoutes = require("./routes/bookingRoutes");


app.use('/', homeRoutes);
app.use('/admin', adminRoutes);
app.use("/bookings", bookingRoutes);

const PORT = 4444;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
