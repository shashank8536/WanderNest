const express= require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const session = require("express-session");
const flash = require("connect-flash"); 
const path = require("path");


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

// const cookieParser = require("cookie-parser");

// // for use ccookie parser
// app.use(cookieParser());


// app.get("/getcookies",(req,res)=>{
//     res.cookie("greet","namaste");
//     res.cookie("Origin","India");
//     res.send("We send you a cookie");
// })


// app.get("/",(req,res)=>{
//     console.log(req.cookies);
//     res.send("Hi i am a root");
// });

// app.use("/users",users);
// app.use("/posts",posts);

//after this koi bhi request k saathn ab session id hmare browser k pass jaegi 
app.use(session({secret:"my supersecretstring", resave:false, saveUninitialized:true}));
app.use(flash());



app.get("/register",(req,res)=>{
    let {name="batman"} =req.query;
    req.session.name=name;
    req.flash("success","user registered sucessfully");  //using key and value in falsh
    res.redirect("/hello"); 
})
app.get("/hello",(req,res)=>{
    res.locals.messages=req.flash("success");
    res.render("page.ejs",{name: req.session.name});
})



// sessuin and protocol

// app.get("/reqcount",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count=1;
//     }
//     res.send(`You sent a request ${req.session.count} times`);
// });

// app.get("/test",(req,res)=>{
//     res.send("test secesssful");
// });

app.listen(3000,()=>{
    console.log("server is working");
});