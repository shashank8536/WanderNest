const express = require("express");
const router = express.Router();

// index-users
router.get("/users",(req,res)=>{
    res.send("Get for users");
})
//show-users
router.get("/users/:id",(req,res)=>{
    res.send("Get for  user id");
})
//post-users
router.post("/users",(req,res)=>{
    res.send("post for users");
})
//delete users
router.delete("/users/:id",(req,res)=>{
    res.send("Delete for user id");
});


module.exports = router;