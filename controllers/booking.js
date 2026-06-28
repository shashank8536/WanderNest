const Booking = require("../models/booking");
const Listing = require("../models/listing");

module.exports.createBooking = async (req, res) => {
    let { id } = req.params;
    let { checkIn, checkOut, guests } = req.body.booking;

    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing not found.");
        return res.redirect("/listings");
    }

    // 1. Security Check: Prevent owner from booking their own listing
    if (listing.owner.equals(req.user._id)) {
        req.flash("error", "You cannot book your own listing.");
        return res.redirect(`/listings/${id}`);
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 2. Date Validations
    if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
        req.flash("error", "Invalid check-in or check-out dates.");
        return res.redirect(`/listings/${id}`);
    }

    if (checkInDate < today) {
        req.flash("error", "Check-in date cannot be in the past.");
        return res.redirect(`/listings/${id}`);
    }

    if (checkOutDate <= checkInDate) {
        req.flash("error", "Check-out date must be after check-in date.");
        return res.redirect(`/listings/${id}`);
    }

    if (Number(guests) < 1) {
        req.flash("error", "Guests must be at least 1.");
        return res.redirect(`/listings/${id}`);
    }

    // 3. Security Check: Overbooking protection (Overlap checks)
    const overlappingBooking = await Booking.findOne({
        listing: id,
        $or: [
            { checkIn: { $gte: checkInDate, $lt: checkOutDate } },
            { checkOut: { $gt: checkInDate, $lte: checkOutDate } },
            { checkIn: { $lte: checkInDate }, checkOut: { $gte: checkOutDate } }
        ]
    });

    if (overlappingBooking) {
        req.flash("error", "This listing is already booked for the selected dates.");
        return res.redirect(`/listings/${id}`);
    }

    // 4. Calculations
    const diffTime = Math.abs(checkOutDate - checkInDate);
    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const basePrice = listing.price * nights;
    const serviceFee = 500;
    const totalPrice = basePrice + serviceFee;

    // 5. Save Booking Record
    const newBooking = new Booking({
        listing: id,
        user: req.user._id,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests: Number(guests),
        totalPrice
    });

    await newBooking.save();
    req.flash("success", "Reservation successful!");
    res.redirect("/bookings");
};

module.exports.listBookings = async (req, res) => {
    // 6. Fetch user's bookings and populate listing details
    const bookings = await Booking.find({ user: req.user._id })
        .populate("listing")
        .sort({ checkIn: 1 });
        
    res.render("bookings/index", { bookings });
};

module.exports.cancelBooking = async (req, res) => {
    let { bookingId } = req.params;
    const booking = await Booking.findById(bookingId);
    
    if (!booking) {
        req.flash("error", "Booking not found.");
        return res.redirect("/bookings");
    }

    // 7. Security Check: Ensure only the person who booked can cancel
    if (!booking.user.equals(req.user._id)) {
        req.flash("error", "You do not have permission to cancel this booking.");
        return res.redirect("/bookings");
    }

    await Booking.findByIdAndDelete(bookingId);
    req.flash("success", "Booking canceled successfully.");
    res.redirect("/bookings");
};
