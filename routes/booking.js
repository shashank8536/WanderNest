const express = require("express");
const router = express.Router({ mergeParams: true });
const WrapAsync = require("../utils/WrapAsync.js");
const { isLoggedIn } = require("../middleware.js");
const bookingController = require("../controllers/booking.js");

// Route to create a new booking
router.post("/", isLoggedIn, WrapAsync(bookingController.createBooking));

// Route to list current user's bookings
router.get("/", isLoggedIn, WrapAsync(bookingController.listBookings));

// Route to cancel/delete a booking
router.delete("/:bookingId", isLoggedIn, WrapAsync(bookingController.cancelBooking));

module.exports = router;
