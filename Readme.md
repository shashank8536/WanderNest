# 🧳 WanderNest

> **Project Status:** Active Development 🟢
>
> A full-stack travel accommodation platform inspired by Airbnb.
>
> **Last Updated:** June 2026

---

# 🏡 WanderNest

A full-stack accommodation discovery platform where users can explore stays, save favorites, book reservations, and interact with listings — built with modern web technologies and a scalable MVC architecture.

---

## 🚀 Overview

WanderNest is a dynamic web application inspired by real-world platforms like Airbnb, but focused on **discovery + personalization + security + extensibility**.

Users can search listings by title, location, or country, toggle category filters, set custom budget price filters, book reservations with live pricing previews, and manage favorites via a personalized wishlist.

---

## ✨ Features

### 🔐 Authentication & Authorization
* Secure user authentication using Passport.js
* Login / Signup system with session persistence
* Route protection using custom middlewares
* Ownership-based access control (only owners can edit/delete listings)

---

### 🏘️ Listings Management
* Create, edit, and delete listings
* Upload images via Cloudinary
* Structured data using MongoDB
* MVC-based clean architecture

---

### 🔍 Advanced Search & Filters (NEW)
* **Keyword Search:** Search for listings matching title, location, or country.
* **Category Filters:** Quick tags for Trending, Rooms, Castles, Amazing Pools, Domes, etc.
* **Compact Price Filter:** Inline filter button inside the search input. It opens a sleek dropdown with a frosted glass look (`backdrop-filter: blur(10px)`) to input minimum and maximum prices.
* **Filter Persistence:** Searching or clicking links preserves other active filter states.

---

### 📅 Booking & Reservation System (NEW)
* **Responsive Booking Widget:** Embedded directly beside listing details, showing a sticky panel on larger screens.
* **Live Price Calculator:** Automatically computes nights, base rates, service fees, and invoice totals instantly when dates are selected.
* **Access Control Checks:** Prevents listing owners from booking their own listings.
* **Double Booking Prevention:** Validates check-in/out date ranges and runs a database overlap query before reserving.
* **My Bookings Dashboard:** A private panel showing booking details with check-in, check-out, guests count, prices, and cancellation actions.

---

### 📩 Advanced Authentication & Email Verification (NEW)
* **Email Verification (OTP):** Users receive a 6-digit OTP email upon signup to confirm their identity.
* **Unverified Login Interceptor:** If a registered user tries to log in without verification, they are intercepted, sent a new OTP, and redirected to verify.
* **Resend OTP Flow:** Clean interface option for users to resend OTP emails.
* **Transporter System:** Backed by Nodemailer and Gmail's secure App Passwords.

---

### ❤️ Wishlist System
* Users can save/unsave listings
* Toggle functionality (add/remove)
* Stored in user schema using references
* Personalized wishlist page

---

### ⭐ Reviews System
* Add and delete reviews on listings
* Linked with users and listings
* Maintains relational data integrity

---

### 🗺️ Map Integration
* Interactive maps using Mapbox
* Displays listing location visually using coordinates

---

### 🌙 Dark Mode (Enhanced UI)
* Toggle between light and dark themes
* Persistent theme using localStorage
* Smooth UI transitions

---

## 🧠 Tech Stack

### Frontend
* EJS (Embedded JavaScript Templates)
* Bootstrap 5
* CSS (Custom styling & transitions)
* JavaScript (DOM manipulation & client-side calculators)

### Backend
* Node.js
* Express.js

### Database
* MongoDB
* Mongoose (ODM)

### Authentication
* Passport.js
* passport-local-mongoose

### External Services
* Cloudinary (Image storage)
* Mapbox (Maps & geolocation)
* Nodemailer / Gmail SMTP (Email OTP service)

---

## 📁 Project Structure (MVC)

```
WanderNest/
│
├── models/        → Database schemas (listing, review, user, booking)
├── routes/        → Express routes (listing, reviews, user, wishlist, booking)
├── controllers/   → Business logic (listing, booking, user)
├── views/         → EJS templates
│   ├── bookings/  → Booking index page
│   ├── includes/  → Navbar, footer, flash alerts
│   ├── layouts/   → EJS boilerplates
│   └── listings/  → Listing detail, edit, new, and search pages
├── public/        → Static assets (CSS, JS)
├── utils/         → Utility functions (ExpressError, WrapAsync)
├── middleware.js  → Custom middleware
├── app.js         → Entry point
```

---

## 🔥 Key Highlights

* Clean MVC architecture
* Real-world integrations (Cloudinary, Mapbox)
* Secure authentication system
* Preventative security (Overbooking checks, ownership restrictions, auth safeguards)
* Dynamic UI with dark mode and live reservation calculators

---

## 🛠️ Future Improvements

* 💳 Payment gateway integration (Stripe/Razorpay)
* 📩 Email alerts for reservations and cancellations
* 🤖 AI-powered support assistant

---

## ⚙️ Installation & Setup

```bash
git clone https://github.com/your-username/WanderNest.git
cd WanderNest
npm install
```

---

### ▶️ Run the App

```bash
npm start
```

---

### 🔐 Environment Variables (.env)

Create a `.env` file and add:

```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_key
CLOUDINARY_SECRET=your_secret

MAP_TOKEN=your_mapbox_token

DB_URL=mongodb://127.0.0.1:27017/wanderlust
SESSION_SECRET=your_secret

EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
```

---

## 📣 Author

**Shashank Shekhar**  
B.Tech Student | Full Stack Developer

---

## ⭐ If you like this project

Give it a ⭐ on GitHub and share feedback!

