const User = require("../models/user");

module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs");
}

// for post we using async because we are going save record in db and all 

module.exports.signup = async(req,res)=>{
    try{
            let {username,email,password}=req.body;
    const newUser = new User({email,username});
    const registeredUser = await User.register(newUser,password);
    console.log(registeredUser);
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Welcome to WanderNest");
        res.redirect("/listings");
    });
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }

}

module.exports.renderLoginForm =(req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login =async(req,res)=>{
    req.flash("success","Welcome back to WanderNest!");
    const redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
    // res.redirect(res.locals.redirectUrl);

}
module.exports.logout =(req,res,next)=>{
    req.logout((err)=>{
        if(err){
          return next(err);
        }
        req.flash("success","you are logged out sucessfully");
        res.redirect("/listings");
    })
};


