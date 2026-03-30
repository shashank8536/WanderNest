const express = require("express");
const router = express.Router({mergeParams: true});
const WrapAsync = require("../utils/WrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validatereview, isLoggedIn,isReviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/review.js");
const review = require("../models/review.js");


//for reviews always we want to take comman part
//Review route-> Post route in this also pass validatereview as a middleware
//to s
router.post("/",isLoggedIn,validatereview, WrapAsync(reviewController.createReview));

// Delete route for reviews
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,WrapAsync(reviewController.deleteReview));

module.exports = router;