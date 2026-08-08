# WanderNest

WanderNest is a full-stack travel accommodation platform inspired by Airbnb. It enables users to discover stays, book accommodations, manage reservations, and receive AI-powered travel recommendations. The platform combines secure authentication, OTP-based email verification using the Brevo Transactional Email API, real-time booking validation, live weather insights, and personalized AI-powered travel planning into a modern travel experience.

## Features

### Authentication & Security

- Secure authentication using Passport.js
- OTP-based email verification using Brevo Transactional Email API
- Forgot Password and Reset Password functionality
- Session-based authentication
- Ownership-based authorization
- Protected routes using custom middleware

### Listings Management

- Create, edit, and delete property listings
- Cloudinary image upload and management
- Responsive listing pages
- MVC architecture

### Search & Filters

- Search by title, location, or country
- Category-based filtering
- Price range filter
- Persistent search and filter state

### Booking System

- Real-time booking widget
- Dynamic price calculation
- Booking conflict detection
- Prevent owners from booking their own listings
- Booking history dashboard
- Booking confirmation and cancellation emails

### AI Travel Assistant

- AI-generated day-wise travel itinerary
- Live weather information using OpenWeather API
- Smart packing recommendations
- Personalized travel advisory
- Destination insights
- Nearby alternative destination recommendations
- Recommended WanderNest stays
- Mapbox-powered destination geocoding
- Responsive UI with interactive travel planner

### Reviews & Wishlist

- Add and delete reviews
- Wishlist management
- Personalized user experience

### Maps

- Interactive Mapbox integration
- Geographic location visualization

---

# Tech Stack

## Frontend

- EJS
- HTML5
- CSS3
- Bootstrap 5
- JavaScript

## Backend

- Node.js
- Express.js

## Database

- MongoDB
- Mongoose

## Authentication

- Passport.js
- Passport Local Mongoose
- Express Session

## APIs & Services

- Gemini API
- OpenWeather API
- Mapbox API
- Cloudinary
- Brevo Transactional Email API

---

# Project Structure

```text
WanderNest
│
├── controllers/
├── middleware/
├── models/
├── public/
│   ├── css/
│   ├── js/
│
├── routes/
├── utils/
├── views/
│   ├── bookings/
│   ├── includes/
│   ├── layouts/
│   ├── listings/
│   └── users/
│
├── app.js
├── package.json
└── README.md
```

---

# Installation

Clone the repository

```bash
git clone https://github.com/your-username/WanderNest.git
```

Navigate to the project directory

```bash
cd WanderNest
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm start
```

---

# Environment Variables

Create a `.env` file in the root directory and configure the following variables:

```env
MONGO_URL=your_mongodb_connection_string

SECRET=your_session_secret

MAP_TOKEN=your_mapbox_token

WEATHER_API_KEY=your_openweather_api_key

GEMINI_API_KEY=your_gemini_api_key

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_api_secret

EMAIL_USER=your_verified_brevo_sender_email
BREVO_API_KEY=your_brevo_api_key
```

---

# Future Enhancements

- Payment gateway integration (Stripe/Razorpay)
- Google OAuth authentication
- AI-powered travel route planner
- Multi-language support
- Booking analytics dashboard
- Admin dashboard
- User notifications

---

# Author

**Shashank Shekhar**

B.Tech Student | Full Stack Developer

---

If you found this project useful, consider giving it a star on GitHub.