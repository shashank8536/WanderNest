const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

//For generating PackingList
async function generatePackingList(
    destination,
    travelMonth,
    currentMonth,
    duration,
    travelType,
    weather
) {

    const prompt = `
You are WanderNest AI, an experienced travel consultant.

Your task is to generate ONLY the most important travel essentials for the traveler.

Trip Details:

Destination: ${destination}
Current Month: ${currentMonth}
Travel Month: ${travelMonth}
Trip Duration: ${duration} days
Travel Type: ${travelType}
Current Weather: ${weather}

IMPORTANT RULES:

1. The user is planning a future trip.

2. If the Travel Month is DIFFERENT from the Current Month:
   - Prioritize the expected seasonal climate of the destination during the selected Travel Month.
   - Use the Current Weather only as background information, not as the main factor for recommendations.

3. If the Travel Month is the SAME as the Current Month:
   - Use the Current Weather together with the destination to make recommendations.

4. Analyze ALL of the following before making recommendations:
   - Destination
   - Travel Month
   - Typical Seasonal Climate
   - Travel Type
   - Trip Duration

5. Always include these essential travel items whenever applicable:
   - Government ID or Passport
   - Phone Charger or Power Bank
   - Daily Medicines
   - Comfortable Clothes suitable for the travel season
   - Appropriate Footwear

6. Recommend weather-specific essentials ONLY when necessary.

Examples:
- Rain → Raincoat or Umbrella
- Cold → Thermal Wear, Warm Jacket, Gloves
- Hot → Cotton Clothes, Sunscreen, Sunglasses, Water Bottle

7. Recommend destination-specific essentials whenever required.

Examples:
- Ladakh → Oxygen Can, Lip Balm, Thermal Wear
- Rajasthan → Cotton Clothes, Cap, Electrolyte Powder
- Goa → Swimsuit, Flip-Flops
- Himachal Trek → Trekking Shoes, Torch, First Aid Kit
- Kerala Monsoon → Waterproof Bag, Umbrella

8. Recommend ONE OR TWO travel-type-specific items.

Examples:
- Trekking → Trekking Shoes, Flashlight
- Camping → Sleeping Bag
- Beach → Waterproof Phone Pouch
- Business → Formal Clothing

9. Never recommend unnecessary or luxury items.

Do NOT include:
- Bluetooth Speakers
- Gaming Consoles
- Drones
- Expensive Gadgets
- Cameras
- Laptop (unless absolutely necessary)

10. Recommend ONLY the 8 MOST IMPORTANT essentials.

11. Avoid duplicate or similar items.

12. Return ONLY a valid JSON array.

Example:

[
  "Government ID",
  "Phone Charger or Power Bank",
  "Daily Medicines",
  "Warm Jacket",
  "Comfortable Footwear",
  "Umbrella",
  "Water Bottle",
  "Small First Aid Kit"
]

Do not explain anything.
Do not use markdown.
Return ONLY the JSON array.
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
    });

    return response.text;
}
// For Generating TravelAdivisory
async function generateTravelAdvisory(
    destination,
    travelMonth,
    currentMonth,
    duration,
    travelType,
    weather
) {

    const prompt = `
You are WanderNest AI, an experienced travel advisor.

Generate a short and practical travel advisory for the following trip.

Trip Details:

Destination: ${destination}
Current Month: ${currentMonth}
Travel Month: ${travelMonth}
Trip Duration: ${duration} days
Travel Type: ${travelType}
Current Weather: ${weather}

IMPORTANT RULES:

1. The user is planning a future trip.

2. If the Travel Month is DIFFERENT from the Current Month:
   - Prioritize the destination's expected seasonal climate during the selected Travel Month.
   - Use the Current Weather only as background information.

3. If the Travel Month is the SAME as the Current Month:
   - Use the Current Weather together with the destination.

Generate 5 practical travel advisories.

Include advice related to:
- Weather precautions
- Health & safety
- Road or transportation conditions
- Clothing suggestions
- Local travel tips

Return ONLY a valid JSON array.

Example:

[
"Carry a waterproof jacket during sudden showers.",
"Roads may become slippery after rainfall.",
"Keep emergency contact numbers saved on your phone.",
"Wear comfortable walking shoes.",
"Stay hydrated throughout the trip."
]

Do not explain anything.
Do not use markdown.
Return ONLY the JSON array.
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
    });

    return response.text;
}
// For generating Itenary
async function generateItinerary(
    destination,
    travelMonth,
    currentMonth,
    duration,
    travelType,
    weather
) {

    const prompt = `
You are WanderNest AI, an expert travel planner.

Create a personalized travel itinerary.

Trip Details:

Destination: ${destination}
Current Month: ${currentMonth}
Travel Month: ${travelMonth}
Trip Duration: ${duration} days
Travel Type: ${travelType}
Current Weather: ${weather}

IMPORTANT RULES:

1. The user is planning a future trip.

2. If the Travel Month differs from the Current Month, use the destination's typical seasonal conditions for that month.

3. Recommend the BEST places to visit based on:
- Famous attractions
- Hidden gems
- Recently popular places (if applicable)
- Scenic viewpoints
- Local cultural experiences

4. Recommend only places that are open and suitable for tourists.

5. Avoid duplicate attractions.

6. Arrange the itinerary day-wise.

7. Each day MUST contain ONLY these keys:
- day
- morning
- afternoon
- evening

Do not use "title", "places", or any other keys.

8. Keep travel between places practical and minimize unnecessary travel time.

9. If the trip duration is greater than the number of available attractions, distribute the attractions naturally.

10. Return ONLY valid JSON.

Example:

Example:

[
  {
    "day": 1,
    "morning": "Kashi Vishwanath Temple",
    "afternoon": "Sarnath",
    "evening": "Dashashwamedh Ghat Ganga Aarti"
  },
  {
    "day": 2,
    "morning": "Banaras Hindu University",
    "afternoon": "Ramnagar Fort",
    "evening": "Assi Ghat"
  }
]

Do not explain anything.
Return ONLY JSON.
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
    });

    return response.text;
}
module.exports = {
    generatePackingList,
    generateTravelAdvisory,
    generateItinerary
};