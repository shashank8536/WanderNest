const axios = require("axios");
const Listing = require("../models/listing");
const { generateTravelPlan } = require("../services/geminiService");

const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");

const mapToken = process.env.MAP_TOKEN;

const geocodingClient = mbxGeocoding({
    accessToken: mapToken,
});

module.exports.renderTravelAssistant = (req, res) => {
    res.render("listings/travel-assistant");
};


module.exports.generateTravelPlan = async (req, res) => {
    try {
        const { destination } = req.body;

        const geoResponse = await geocodingClient
            .forwardGeocode({
                query: destination.trim(),
                limit: 1,
            })
            .send();

        if (!geoResponse.body.features.length) {
            return res.status(404).json({
                success: false,
                message: "Destination not found."
            });
        }

        const place = geoResponse.body.features[0];
        const searchDestination = place.text;

        //  console.log("Mapbox Place:", place.place_name);

        const [longitude, latitude] = place.geometry.coordinates;

        const API_KEY = process.env.WEATHER_API_KEY;

        const url =
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;

        const response = await axios.get(url);

        // console.log("Mapbox Place:");
        // console.log(geoResponse.body.features[0].place_name);

        // console.log("Coordinates:");
        // console.log(latitude, longitude);

        const weatherData = {
            city: response.data.name,
            country: response.data.sys.country,
            temperature: Math.round(response.data.main.temp),
            feelsLike: Math.round(response.data.main.feels_like),
            weather: response.data.weather[0].main,
            description: response.data.weather[0].description,
            humidity: response.data.main.humidity,
            windSpeed: response.data.wind.speed,
            icon: response.data.weather[0].icon
        };
        const currentMonth = new Date().toLocaleString("en-US", {
            month: "long",
        });
        const weatherSummary = `
            Temperature: ${weatherData.temperature}°C
            Feels Like: ${weatherData.feelsLike}°C
            Weather: ${weatherData.weather}
            Description: ${weatherData.description}
            Humidity: ${weatherData.humidity}%
            Wind Speed: ${weatherData.windSpeed} m/s
        `;
        const aiResponse = await generateTravelPlan(
            destination,
            req.body.month,
            currentMonth,
            req.body.duration,
            req.body.travelType,
            weatherSummary
        );

        let aiData;

        try {
            aiData = JSON.parse(aiResponse);
        } catch (parseError) {
            console.error("Gemini returned invalid JSON:");
            console.error(aiResponse);

            return res.status(500).json({
                success: false,
                message: "Failed to generate a valid AI travel plan."
            });
        }

        if (
            !aiData ||
            !Array.isArray(aiData.packingList) ||
            !Array.isArray(aiData.travelAdvisory) ||
            !Array.isArray(aiData.itinerary) ||
            !aiData.travelInsights
        ) {
            return res.status(500).json({
                success: false,
                message: "Incomplete AI response received."
            });
        }

        // console.log("AI DATA:");
        // console.log(aiData);

        const travelInsights = aiData.travelInsights;
        let alternativeListings = [];

        if (travelInsights.type === "alternative") {

            const alternativeLocations = travelInsights.alternatives.map(
                (place) => place.name
            );

            alternativeListings = await Listing.find({
                $or: alternativeLocations.flatMap(place => ([
                    {
                        location: {
                            $regex: place,
                            $options: "i"
                        }
                    },
                    {
                        country: {
                            $regex: place,
                            $options: "i"
                        }
                    }
                ]))
            }).limit(3);
        }

        // console.log("Destination received:", destination);

        // // Find recommended WanderNest stays
        const recommendedStays = await Listing.find({
            $or: [
                {
                    location: {
                        $regex: searchDestination,
                        $options: "i"
                    }
                },
                {
                    country: {
                        $regex: searchDestination,
                        $options: "i"
                    }
                }
            ]
        }).limit(3);

        // console.log(recommendedStays);

        // // DEBUG
        // const allListings = await Listing.find({}, "title location country");

        // console.log("All Listings:");
        // console.log(allListings);

        return res.json({
            success: true,

            weather: weatherData,

            packingList: aiData.packingList,

            travelAdvisory: aiData.travelAdvisory,

            itinerary: aiData.itinerary,

            recommendedStays,

            travelInsights,

            alternativeListings
        });
    } catch (err) {

        if (err.response?.status === 404) {
            return res.status(404).json({
                success: false,
                message: "Destination not found. Please select a valid city."
            });
        }

        console.error(err);

        return res.status(500).json({
            success: false,
            message: "Something went wrong."
        });
    }
};