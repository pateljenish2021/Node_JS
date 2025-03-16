const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

router.get("/book/:id", bookingController.getBookingPage);
router.post("/confirm-booking", bookingController.confirmBooking);
router.get("/", bookingController.getAllBookings);

module.exports = router;
