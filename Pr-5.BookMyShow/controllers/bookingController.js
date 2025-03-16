const Movie = require("../models/Movie");
const Booking = require("../models/Booking");

// Get the booking page
exports.getBookPage = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).send("Movie not found");

        res.render("book", { movie });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};

// Confirm Booking
exports.confirmBooking = async (req, res) => {
    try {
        const { movieId, selectedSeats } = req.body;
        if (!movieId || !selectedSeats) {
            return res.status(400).send("Invalid booking data");
        }

        const movie = await Movie.findById(movieId);
        if (!movie) return res.status(404).send("Movie not found");

        const newBooking = new Booking({
            movieId,
            movieTitle: movie.title,
            movieImage: movie.image,
            selectedSeats: selectedSeats.split(","),
            bookingDate: new Date(),
        });

        await newBooking.save();
        res.redirect("/bookings");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};

// Get All Bookings
exports.getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.render("booking", { bookings });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};
