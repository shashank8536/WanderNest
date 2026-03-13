const User = require("../models/user"); // ✅ already added (GOOD)

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const Listing = require("../models/listing");
const { data: sampleListings } = require("./data");

const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");

async function seedDB() {
  await Listing.deleteMany({});
  console.log("Old listings removed");

  // ✅ ADD THIS (get any existing user)
  const adminUser = await User.findOne();

  if (!adminUser) {
    console.log("❌ No users found. Please register a user first.");
    return;
  }

  for (let listing of sampleListings) {
    const response = await geocodingClient
      .forwardGeocode({
        query: `${listing.location}, ${listing.country}`,
        limit: 1,
      })
      .send();

    if (!response.body.features.length) {
      console.log("❌ Skipping:", listing.location);
      continue;
    }

    listing.geometry = response.body.features[0].geometry;

    // ✅ ADD THIS ONE LINE (MAIN FIX)
    listing.owner = adminUser._id;

    const newListing = new Listing(listing);
    await newListing.save();
  }

  console.log("✅ Database seeded with geometry + owner");
}

seedDB()
  .then(() => mongoose.connection.close())
  .catch(console.error);
