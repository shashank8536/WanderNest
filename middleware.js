const Listing = require("./models/listing");
const Review = require("./models/review");

const {listingSchema,reviewSchema} = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js")

module.exports.isLoggedIn = (req,res,next)=>{
     if(!req.isAuthenticated()){
      req.session.redirectUrl = req.originalUrl; ;
        req.flash("error", "you must be looged in to create listing!");
       return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req,res,next)=>{
   if(req.session.redirectUrl){
      res.locals.redirectUrl = req.session.redirectUrl;
   }
   next();
}

//for the form of authorization we create a middlewaare
module.exports.isOwner = async(req,res,next)=>{
     let{id} = req.params;
    let listing = await Listing.findById(id);
    // for sow and edit authorization
    if(! listing.owner.equals(res.locals.currUser._id)){
      req.flash("error","you are not a owner of this listing");
      return res.redirect(`/listings/${id}`);
    }
    next();
}

//To validate the listing schema
module.exports.validatelisting = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        //for addition details
        let errmsg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400,error);
    }else{
        next(); 
    }
}
//To validate the review Schema
module.exports.validatereview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        //for addition details
        let errmsg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400,error);
    }else{
        next(); 
    }
}

// to validdate review authore
module.exports.isReviewAuthor = async(req,res,next)=>{
     let{id, reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
      req.flash("error","you did not create this review");
      return res.redirect(`/listings/${id}`);
    }
    next();
}
