const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

async function generateTravelPlan(
    destination,
    travelMonth,
    currentMonth,
    duration,
    travelType,
    weather
) {

    const prompt = `
You are WanderNest AI.

You must generate FOUR sections:

1. Packing List
2. Travel Advisory
3. Travel Itinerary
4. Why Visit Highlights

Trip Details:

Destination: ${destination}
Current Month: ${currentMonth}
Travel Month: ${travelMonth}
Trip Duration: ${duration} days
Travel Type: ${travelType}
Current Weather: ${weather}

---------------------------------------------------
PACKING LIST RULES
---------------------------------------------------

Generate the packing list exactly using these rules:

- User is planning a future trip.
- If Travel Month differs from Current Month,
  prioritize the seasonal climate.
- Otherwise use Current Weather.

Always include whenever applicable:

- Government ID or Passport
- Phone Charger or Power Bank
- Daily Medicines
- Comfortable Clothes
- Appropriate Footwear

Weather specific:

Rain:
- Umbrella
- Raincoat

Cold:
- Thermal Wear
- Warm Jacket
- Gloves

Hot:
- Cotton Clothes
- Sunscreen
- Sunglasses
- Water Bottle

Destination specific examples:

Ladakh:
- Oxygen Can
- Lip Balm
- Thermal Wear

Rajasthan:
- Cap
- Cotton Clothes
- Electrolyte Powder

Goa:
- Swimsuit
- Flip-Flops

Himachal Trek:
- Trekking Shoes
- Torch
- First Aid Kit

Kerala Monsoon:
- Waterproof Bag
- Umbrella

Travel Type examples:

Beach:
- Waterproof Phone Pouch

Business:
- Formal Clothing

Camping:
- Sleeping Bag

Trekking:
- Trekking Shoes
- Flashlight

Only recommend the 8 most important essentials.

---------------------------------------------------
TRAVEL ADVISORY RULES
---------------------------------------------------

Generate exactly 5 advisories.

Include:

- Weather precautions
- Health
- Safety
- Clothing
- Local travel tips
- Transportation

---------------------------------------------------
ITINERARY RULES
---------------------------------------------------

Create a day-wise itinerary.

Each day MUST contain ONLY:

day
morning
afternoon
evening

Do NOT use:

title
places

Recommend:

- Famous attractions
- Hidden gems
- Scenic viewpoints
- Cultural experiences

Arrange locations practically.

---------------------------------------------------
WHY VISIT HIGHLIGHTS
---------------------------------------------------

Generate exactly 4 destination highlights.

Do not decide whether the weather is favorable.
Always return exactly 4 highlights.

Examples:

- Perfect weather for sightseeing.
- Excellent trekking season.
- Beautiful mountain views.
- Rich local culture.
---------------------------------------------------
IMPORTANT
---------------------------------------------------

Return ONLY valid JSON.

{
    "packingList":[
        "...",
        "..."
    ],

    "travelAdvisory":[
        "...",
        "..."
    ],

    "itinerary":[
        {
            "day":1,
            "morning":"...",
            "afternoon":"...",
            "evening":"..."
        }
    ],

    "highlights":[
        "...",
        "...",
        "...",
        "..."
    ]
}

Do NOT explain anything.

Do NOT use markdown.

Return ONLY JSON.
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
    });

    return response.text;
}

module.exports = {
    generateTravelPlan,
};