// logic of initialisation
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

Mongo_Url = "mongodb://127.0.0.1:27017/wanderlust"

main()
.then(()=>{
    console.log("connected to database");
})
.catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(Mongo_Url);
}

const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data= initData.data.map((obj) => ({...obj, owner:'691e171478894583a2faf0e0'}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}

initDB();