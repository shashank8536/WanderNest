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
4. Travel Insights

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
TRAVEL INSIGHTS
---------------------------------------------------

You are an experienced travel advisor.

Analyze ALL of the following before making a recommendation:

- Current weather
- Temperature
- Weather description
- Humidity
- Wind conditions
- Travel month
- Seasonal conditions
- Tourist experience
- Sightseeing comfort
- Accessibility
- Safety
- Outdoor activity suitability

Decide whether this destination should be recommended.

If current weather or seasonal conditions are likely to significantly affect the travel experience or safety, return:

"type": "alternative"

Otherwise return:

"type": "whyVisit"

Rules:

If type is "whyVisit":

- Generate exactly 4 highlights.
- Explain why this is a good time to visit.

If type is "alternative":

- Leave highlights empty.
- Suggest exactly 3 alternative destinations.
- Explain why each alternative is better.

Think like an experienced travel planner rather than simply describing the weather.

Do not make recommendations based only on tourist popularity.

Consider whether a traveler would actually enjoy the trip under the given weather and seasonal conditions.

If sightseeing, trekking, beach activities, or transportation are likely to be severely affected, recommend alternatives.

Do not recommend unsafe travel.
---------------------------------------------------
IMPORTANT
---------------------------------------------------

Do not always recommend the destination.

If the weather or seasonal conditions make travel unsafe, uncomfortable, or significantly reduce the overall experience, recommend better alternative destinations instead.

Your recommendation should prioritize traveler safety, comfort, and overall experience over simply listing attractions.

Ensure all recommendations are internally consistent.

Rules:

- If "type" is "whyVisit":
  - Generate exactly 4 highlights.
  - Alternatives must be an empty array.

- If "type" is "alternative":
  - Highlights must be an empty array.
  - Generate exactly 3 alternative destinations.

Never return both highlights and alternatives together.

Always keep the JSON structure exactly as specified.

If you return:

"type": "whyVisit"

then:

- highlights must contain exactly 4 items.
- alternatives must be [].

If you return:

"type": "alternative"

then:

- highlights must be [].
- alternatives must contain exactly 3 destinations.

Never leave either field undefined.

Return ONLY valid JSON.

{
    "packingList": [
        "...",
        "..."
    ],

    "travelAdvisory": [
        "...",
        "..."
    ],

    "itinerary": [
        {
            "day": 1,
            "morning": "...",
            "afternoon": "...",
            "evening": "..."
        }
    ],

    "travelInsights": {
        "type": "whyVisit OR alternative",
        "reason": "...",
        "highlights": [
            "...",
            "...",
            "...",
            "..."
        ],
        "alternatives": [
            {
                "name": "...",
                "reason": "...",
                "bestFor": "..."
            }
        ]
    }
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