if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}
const express= require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./Utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash"); 
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

// const path = require("path");


const listings = require("./Routes/listing.js")
const review = require("./Routes/reviews.js")
const user = require("./Routes/user.js");

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

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const sessionOptions = {
    secret :"mysupersecretcode",
    resave: false,
    saveUninitialized:true,
    cookie: {
        expires: Date.now()+ 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly:true,
    }
};


app.use(session(sessionOptions));
app.use(flash());


// implement passport 
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

// for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// using flash by middleware
app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
     res.locals.error = req.flash("error");
    // for show login signup if case
    res.locals.currUser=req.user;
    next();
})

////  for listing
app.use("/listings",listings);
// for reviews
app.use("/listings/:id/review",review);
// we use merge params to send id to revew.js for post a review from app.js
//for user
app.use("/",user);



// app.get("/",(req,res)=>{
//     res.send("server is working");
// })



// app.get("/demouser",async(req,res)=>{
//     let fakeUser = new User({
//         email: "student@gmail.com",
//         username:"sigma-student"
//     });

//     let registerUser= await User.register(fakeUser,"helloworld");
//     res.send(registerUser);
// })




// * means agar upar kisi incoming response se match ho ggya hoga to response chla gya hoga 
//agar kisi se match nhii hua to yha pe aake match hoga
// Catch-all 404 handler — Express 5 syntax
app.all("*", (req, res, next) => {
  next(new ExpressError(404, 'Page not Found!'));
});

 //custom error handling
app.use((err,req,res,next)=>{
    // send expresserror
    let{statusCode=500, message="Something went wrong"}=err;
    res.status(statusCode).render("error.ejs",{message});
   // res.status(statusCode).send(message);
});
app.listen(8080,()=>{
    console.log("port 8080 is working");
})