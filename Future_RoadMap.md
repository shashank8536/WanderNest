# WanderNest Roadmap

This document outlines the planned improvements for WanderNest after the current production release. The project is being developed incrementally, with each milestone focusing on improving user experience, security, and real-world functionality.

---

# Current Release (v1.0)

The current version includes:

- User Authentication (Passport.js)
- Email OTP Verification
- Forgot Password & Password Reset
- Listings Management (CRUD)
- Image Uploads (Cloudinary)
- Search & Category Filters
- Wishlist System
- Reviews & Ratings
- Booking & Reservation System
- Booking Confirmation & Cancellation Emails
- AI Travel Assistant
- Interactive Maps (Mapbox)
- Responsive Design
- Dark Mode
- Secure MVC Architecture

---

# Upcoming Features

## Version 1.1 – Authentication & User Experience

### Google Sign-In

Allow users to authenticate using their Google account.

Planned Features

- Sign in with Google
- Automatic account creation
- Secure OAuth authentication
- Seamless login experience

Status

- Planned

---

## Version 1.2 – AI Travel Enhancements

### AI Route Planner

Extend the AI Travel Assistant to provide complete travel guidance from the user's starting location to the destination.

Example

```
Delhi
   ↓ Train
Haridwar
   ↓ Bus
Rishikesh
   ↓ Taxi
Sonprayag
   ↓ Local Transport
Gaurikund
   ↓ Trek
Kedarnath
```

Planned Features

- Route suggestions
- Transport recommendations
- Estimated travel time
- Approximate travel cost
- Alternative routes
- Travel tips
- Seasonal travel recommendations

Status

- Planned

---

## Version 1.3 – Online Payments

Integrate a secure payment gateway into the booking flow.

Planned Features

- Razorpay / Stripe integration
- Secure online payments
- Booking confirmation after successful payment
- Payment failure handling
- Transaction reference storage

Status

- Planned

---

## Version 1.4 – Booking Enhancements

Improve the booking experience with additional utilities.

Planned Features

- Booking invoices
- PDF receipts
- Payment history
- Booking timeline
- Improved email templates

Status

- Planned

---

## Version 2.0 – Host Dashboard

Introduce analytics and management tools for property owners.

Planned Features

- Host dashboard
- Booking analytics
- Revenue overview
- Property statistics
- Guest insights

Status

- Planned

---

# Long-Term Ideas

The following ideas are under consideration for future releases.

- AI-powered packing recommendations
- Multi-day weather forecasts
- Nearby attractions and local recommendations
- Travel budget estimation
- Multi-language support
- Push notifications
- Progressive Web App (PWA)
- Admin dashboard
- Booking analytics
- Enhanced recommendation engine

---

# Development Workflow

Future enhancements will be developed in dedicated feature branches after the stable production release.

Example workflow

```
main
│
├── feature/google-auth
├── feature/payment-gateway
├── feature/ai-route-planner
├── feature/booking-invoices
└── feature/host-dashboard
```

This approach keeps the production branch stable while allowing new features to be developed, tested, and merged independently.

---

# Project Vision

The goal of WanderNest is to evolve from a traditional accommodation booking platform into an intelligent travel companion by combining secure booking, AI-powered trip planning, and modern travel tools within a single application.