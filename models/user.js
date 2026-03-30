// we create this for user model we created
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email:{
        type:String,
        required: true
    },
    username:{
        type:String,
        required:true
    },
    wishlist:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Listing"
    }]
});

// passport local mongoose automatically define the username and password in our schema
userSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model("User",userSchema);

