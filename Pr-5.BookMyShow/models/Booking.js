const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
    movieTitle: { type: String, required: true },
    movieImage: { type: String, required: true },
    selectedSeats: { type: [String], required: true },
    bookingDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Booking", BookingSchema);
