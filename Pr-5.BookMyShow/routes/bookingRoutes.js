const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Movie = require("../models/Movie");

// GET: Show ticket booking page
router.get("/book/:id", async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).send("Movie not found");
        }
        res.render("book", { movie });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// POST: Confirm booking
router.post('/confirm-booking', async (req, res) => {
    console.log(req.body); // Debugging

    const { movieId, selectedSeats } = req.body;

    if (!movieId) {
        return res.status(400).send("Movie ID is required.");
    }

    try {
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).send("Movie not found.");
        }

        const booking = new Booking({
            movieId,
            movieTitle: movie.title,
            movieImage: movie.image,
            selectedSeats: selectedSeats ? selectedSeats.split(',') : [],
            bookingDate: new Date()
        });

        await booking.save();
        res.redirect('/bookings');
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});


// GET: Show all bookings
router.get("/", async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ bookingDate: -1 });
        res.render("booking", { bookings });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
