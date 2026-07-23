const axios = require("axios");
const { generatePackingList } = require("../services/geminiService");

module.exports.renderTravelAssistant = (req, res) => {
    res.render("listings/travel-assistant");
};


module.exports.generateTravelPlan = async (req, res) => {
    try {
        const { destination } = req.body;

        const API_KEY = process.env.WEATHER_API_KEY;

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${destination}&units=metric&appid=${API_KEY}`;

        const response = await axios.get(url);

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
        const packingList = await generatePackingList(
            destination,
            req.body.month,
            currentMonth,
            req.body.duration,
            req.body.travelType,
            weatherData.description
        );
        const packingItems = JSON.parse(packingList);
        // console.log(packingList);

        return res.json({
            success: true,
            weather: weatherData,
            packingList: packingItems
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