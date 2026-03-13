const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
  let { search } = req.query;
  let allListings;

  if (search) {
    let response = await geocodingClient
      .forwardGeocode({
        query: search,
        limit: 1,
      })
      .send();

    let coordinates = response.body.features[0].geometry.coordinates;

    allListings = await Listing.find({
      geometry: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: coordinates,
          },
          $maxDistance: 50000,
        },
      },
    });
  } else {
    allListings = await Listing.find({});
  }

  res.render("listings/index.ejs", { allListings, search });
};

module.exports.renderNewForm =(req,res)=>{
    res.render("listings/new");
}
module.exports.showListing = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path: "reviews", populate: {path:"author"}}).populate("owner");
    if(!listing){
        req.flash("error","Listing you requested for does not exist");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", {listing,mapToken: process.env.MAP_TOKEN});
}

module.exports.createListing =async (req, res) => {

   let response= await geocodingClient.forwardGeocode({
        query:req.body.listing.location,
        limit: 1,
    })
  .send()
  

    let url = req.file.path; //image ka path aur file name nikalne k liye
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;

     newListing.image = {url,filename};

    newListing.geometry = response.body.features[0].geometry;

    let savedListing = await newListing.save();
    
    console.log(savedListing);

    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
}

module.exports.editListing =async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
     if(!listing){
        req.flash("error","Listing you requested for does not exist");
        res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload","/upload/w_250");

    res.render("listings/edit",{listing,originalImageUrl});
}

module.exports.updateListing =async (req,res)=>{
    let{id} = req.params;
   let listing = await  Listing.findByIdAndUpdate(id, {...req.body.listing}); // ye ek body h jiske andar hmara saara ka saara parameter hai

   if(typeof req.file!== "undefined"){
    let url = req.file.path; //image ka path aur file name nikalne k liye
    let filename = req.file.filename;

    listing.image = {url,filename};
    await listing.save();

   }

   req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
}
module.exports.deleteListing = async (req,res)=>{
    let {id}= req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success","LListing Deleted");
    res.redirect("/listings");
}
module.exports.categoryListing = async (req, res) => {
    const { category } = req.params;
    const allListings = await Listing.find({ category });

    res.render("listings/index", { allListings });
}