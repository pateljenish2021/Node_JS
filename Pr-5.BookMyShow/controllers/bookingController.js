const Booking = require("../models/Booking");
const Movie = require("../models/Movie");

exports.getBookingPage = async (req, res) => {
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
};

exports.confirmBooking = async (req, res) => {
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

        const seatsArray = selectedSeats ? selectedSeats.split(',') : [];
        const totalPrice = seatsArray.length * 200; 

        const booking = new Booking({
            movieId,
            movieTitle: movie.title,
            backgroundImage: movie.backgroundImage, 
            category: movie.category,
            duration: movie.duration,
            selectedSeats: seatsArray,
            totalPrice: totalPrice, 
            bookingDate: new Date()
        });

        await booking.save();
        res.redirect('/bookings');
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ bookingDate: -1 });
        res.render("booking", { bookings });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};
