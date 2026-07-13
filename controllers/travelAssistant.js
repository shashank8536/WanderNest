module.exports.renderTravelAssistant=(req,res)=>{
    res.render("listings/travel-assistant");
}
module.exports.generateTravelPlan = (req,res)=>{
    console.log(req.body);

    res.send("Data Recieved Successfully");
}