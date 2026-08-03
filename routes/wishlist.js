const express = require("express");
const router =  express.Router();
const User = require("../models/user");
const Listing = require("../models/listing");
const {isLoggedIn} = require("../middleware");


router.post("/:id", isLoggedIn, async (req, res) => {

    const listingId = req.params.id;       // correct
    const userId = req.user._id;           // correct

    const user = await User.findById(userId);

    // check if already in wishlist
    const index = user.wishlist.indexOf(listingId);

    if(index > -1){
        user.wishlist.splice(index,1);
    } else {
        user.wishlist.push(listingId);
    }

    await user.save();

    res.redirect("/listings");
});

router.get("/",isLoggedIn, async(req,res)=>{
    const user = await User.findById(req.user._id).populate("wishlist");

    res.render("listings/wishlist.ejs",{wishlist: user.wishlist});
})

module.exports = router;