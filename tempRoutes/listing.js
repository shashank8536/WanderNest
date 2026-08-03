const express = require("express");
const router = express.Router();
const WrapAsync = require("../utils/WrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validatelisting} = require("../middleware.js");
const listingController = require("../controllers/listing.js")

const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage })

//index route
//   create route

router
      .route("/")
      .get(WrapAsync(listingController.index))
      .post(
        isLoggedIn,
        upload.single('listing[image]'),
        validatelisting,
        WrapAsync(listingController.createListing)
      );

//new route 
router.get("/new", isLoggedIn,listingController.renderNewForm);

// for category filtering
router.get("/category/:category",WrapAsync(listingController.categoryListing));

//show route
router.get("/:id",WrapAsync(listingController.showListing)
);


//edit route
router.get("/:id/edit",isLoggedIn,isOwner,WrapAsync(listingController.editListing));

//update request
router.put("/:id",isLoggedIn,isOwner,upload.single('listing[image]'),validatelisting, WrapAsync(listingController.updateListing));

//delete route
router.delete("/:id",isLoggedIn,isOwner,WrapAsync(listingController.deleteListing));


module.exports = router;