// we create this for user model we created
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email:{
        type:String,
        required: true
    }
})

// passport local mongoose automatically define the username and password in our schema
userSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model("User",userSchema);

