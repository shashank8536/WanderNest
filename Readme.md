# WanderNest

A full-stack travel accommodation platform inspired by Airbnb that enables users to discover stays, manage bookings, and receive AI-powered travel recommendations. WanderNest combines secure authentication, real-time booking validation, live weather insights, and personalized travel planning into a modern travel experience.

## Live Features

- Secure user authentication with email verification (OTP)
- Property listing management with image uploads
- Advanced search and category filters
- Wishlist management
- Booking and reservation system
- AI-powered Travel Assistant
- Interactive maps with Mapbox
- Review and rating system
- Responsive UI with dark mode support

---

## Key Features

### Authentication & Security

- Secure authentication using Passport.js
- Email verification with OTP via Nodemailer
- Forgot Password and Reset Password
- Session-based authentication
- Ownership-based authorization
- Protected routes using custom middleware

### Listings Management

- Create, edit, and delete property listings
- Cloudinary image upload and management
- Responsive listing pages
- Clean MVC architecture

### Search & Filters

- Search by title, location, or country
- Category-based filters
- Custom price range filter
- Persistent search and filter state

### Booking System

- Real-time booking widget
- Dynamic price calculation
- Booking conflict detection
- Prevents owners from booking their own listings
- Booking history dashboard
- Booking confirmation and cancellation emails

### AI Travel Assistant

The AI Travel Assistant helps users plan trips before booking accommodation.

Features include:

- AI-generated day-wise travel itinerary
- Live weather information using OpenWeather API
- Smart packing recommendations
- Personalized travel advisory
- Destination insights
- Nearby alternative destination recommendations
- Recommended WanderNest stays based on destination
- Mapbox-powered destination geocoding
- Premium responsive UI with smooth interactions

### Reviews & Wishlist

- Add and delete reviews
- Save and manage wishlist
- User-specific personalized data

### Maps

- Interactive Mapbox integration
- Location visualization using geographic coordinates

---

# Tech Stack

## Frontend

- EJS
- Bootstrap 5
- HTML5
- CSS3
- JavaScript

## Backend

- Node.js
- Express.js

## Database

- MongoDB
- Mongoose

## Authentication

- Passport.js
- passport-local-mongoose
- Express Session

## APIs & Services

- Gemini API
- OpenWeather API
- Mapbox API
- Cloudinary
- Nodemailer

---

# Project Structure

```
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
│   └── listings/
│
├── app.js
└── package.json
```

---

# Installation

Clone the repository

```bash
git clone https://github.com/your-username/WanderNest.git
```

Move into the project

```bash
cd WanderNest
```

Install dependencies

```bash
npm install
```

Start the application

```bash
npm start
```

---

# Environment Variables

Create a `.env` file and configure:

```env
MONGO_URL=your_mongodb_connection_string

SECRET=your_session_secret

MAP_TOKEN=your_mapbox_token

WEATHER_API_KEY=your_openweather_api_key

GEMINI_API_KEY=your_gemini_api_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret

EMAIL_USER=your_email
EMAIL_PASS=your_app_password
```

---

# Future Improvements

- Payment gateway integration (Stripe/Razorpay)
- AI-powered travel route planner
- Google OAuth authentication
- Multi-language support
- Booking analytics dashboard

---

# Author

**Shashank Shekhar**

B.Tech Student | Full Stack Developer

---

If you found this project useful, consider giving it a ⭐ on GitHub.