const mongoose = require("mongoose");
const review = require("./review");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: String,
  image: {
    url: String,
    filename:String,
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Price must be a positive number"]
  },
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref:"Review"
    }
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref:"User",
  },
  geometry:{
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    },
  },
    category:{
      type: String,
      enum:[
        "Trending",
        "Rooms",
        "CityWonders",
        "Mountain",
        "Castles",
        "AmazingPool",
        "Camping",
        "Farm",
        "Arctic",
        "Domes",
        "Boats"
      ]
    }
});

// this post we create to delete a all review that is in listing that we delete 
//means jaise listing delete kr diye uske andar jitna eview hoga ye unsbko database se delete kr dega
//mongoose middleware
listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
      await review.deleteMany({_id: {$in: listing.reviews}});
  }
});
listingSchema.index({geometry:"2dsphere"});
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
