const express = require("express");
const router = express.Router();

const { renderTravelAssistant, generateTravelPlan } = require("../controllers/travelAssistant");

// render ai assistannt page
router.get("/travel-assistant",renderTravelAssistant);

// generate travvel plan
router.post("/travel-assistant/generate",generateTravelPlan);

module.exports=router;