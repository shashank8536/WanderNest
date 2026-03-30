# 🏡 WanderNest

A full-stack accommodation discovery platform where users can explore stays, save favorites, and interact with listings — built with modern web technologies and a scalable MVC architecture.

---

## 🚀 Overview

WanderNest is a dynamic web application inspired by real-world platforms like Airbnb, but focused on **discovery + personalization + extensibility**.

Users can browse listings, view locations on maps, leave reviews, and maintain a personalized wishlist.

---

## ✨ Features

### 🔐 Authentication & Authorization

* Secure user authentication using Passport.js
* Login / Signup system
* Session-based authentication
* Route protection using middleware
* Ownership-based access control (only owners can edit/delete listings)

---

### 🏘️ Listings Management

* Create, edit, and delete listings
* Upload images via Cloudinary
* Structured data using MongoDB
* MVC-based clean architecture

---

### ⭐ Reviews System

* Add and delete reviews on listings
* Linked with users and listings
* Maintains relational data integrity

---

### 🗺️ Map Integration

* Interactive maps using Mapbox
* Displays listing location visually

---

### ❤️ Wishlist System (NEW)

* Users can save/unsave listings
* Toggle functionality (add/remove)
* Stored in user schema using references
* Personalized wishlist page
* Protected routes (only logged-in users)

---

### 🌙 Dark Mode (Enhanced UI)

* Toggle between light and dark themes
* Persistent theme using localStorage
* Smooth UI transitions
* Improved accessibility and user experience

---

## 🧠 Tech Stack

### Frontend

* EJS (Embedded JavaScript Templates)
* Bootstrap 5
* CSS (Custom styling)
* JavaScript (DOM manipulation)

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

---

## 📁 Project Structure (MVC)

```
WanderNest/
│
├── models/        → Database schemas
├── routes/        → Express routes
├── controllers/   → Business logic
├── views/         → EJS templates
├── public/        → Static assets (CSS, JS)
├── utils/         → Utility functions
├── middleware.js  → Custom middleware
├── app.js         → Entry point
```

---

## 🔥 Key Highlights

* Clean MVC architecture
* Real-world integrations (Cloudinary, Mapbox)
* Secure authentication system
* Dynamic UI with dark mode
* Personalized wishlist feature
* Scalable and extendable design

---

## 🛠️ Future Improvements

* 📩 Booking Request System (Planned)
* 🤖 AI-powered complaint/support assistant
* 🚗 Vehicle rental integration (optional feature)
* 🔍 Advanced search & filters

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

DB_URL=mongodb://127.0.0.1:27017/wandernest
SESSION_SECRET=your_secret
```

---

## 📌 Usage

* Browse listings
* View details with maps
* Add reviews
* Save listings to wishlist ❤️
* Toggle dark/light mode 🌙

---

## 🎯 Project Purpose

This project demonstrates:

* Full-stack development skills
* Backend architecture (MVC)
* Authentication & authorization
* Database relationships
* UI/UX improvements
* Integration of third-party services

---

## 📣 Author

**Shashank Shekhar**
B.Tech Student | Full Stack Developer

---

## ⭐ If you like this project

Give it a ⭐ on GitHub and share feedback!
