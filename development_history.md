# 📈 WanderNest Development History & Changelog

This document tracks all features, changes, and architectural decisions made during development, serving as a reference for future extensions.

---

## 📅 Phase 1: Search & Price Filter System
**Goal:** Implement full-text destination search and price filters without cluttering the category icon bar.

### 1. View & UI Files
*   **[views/includes/navbar.ejs](file:///c:/Users/Shashank%20Shekhar/Desktop/projects/WanderNest/views/includes/navbar.ejs)**
    *   *Change:* Embedded a settings sliders icon (`<i class="fa-solid fa-sliders"></i>`) directly inside the search input box on the right. Added a Bootstrap Dropdown (`#priceDropdownBtn`) that triggers on click.
    *   *Styling:* Implemented a glassmorphism theme using `backdrop-filter: blur(10px)` and semi-transparent light overlay (`rgba(255, 255, 255, 0.9)`), with a compact width of `250px`. Added dynamic icon coloring so the sliders turn WanderNest red (`#fe424d`) if filters are active. Placed "Clear" and "Apply" buttons side-by-side.
    *   *Why:* To avoid vertical wrapping issues on the category icon bar and keep the UI clean. Nesting it inside the search form ensures that both search queries and price queries are submitted together.
*   **[views/listings/index.ejs](file:///c:/Users/Shashank%20Shekhar/Desktop/projects/WanderNest/views/listings/index.ejs)**
    *   *Change:* Reverted earlier experimental "Filters" button and modal markup, keeping the category and tax toggles clean.
    *   *Why:* To make the filters layout fully clean and prevent the button from wrapping to a second line.

### 2. Controller Files
*   **[controllers/listing.js](file:///c:/Users/Shashank%20Shekhar/Desktop/projects/WanderNest/controllers/listing.js)**
    *   *Change:* Modified `index` and `categoryListing` controllers to extract `minPrice` and `maxPrice` from `req.query`. Compiled a dynamic `priceQuery` using MongoDB `$gte` and `$lte` operators, combining it with name regex searches or coordinates. Passed query parameters back to EJS to pre-fill the form inputs.
    *   *Why:* To ensure the database returns filtered results and maintains active search variables in the UI when the user navigates between views.

---

## 📅 Phase 2: Booking & Reservation System
**Goal:** Introduce a robust reservation widget on property details, secure bookings record tracking, and a user bookings dashboard.

### 1. Database Schema
*   **[models/booking.js](file:///c:/Users/Shashank%20Shekhar/Desktop/projects/WanderNest/models/booking.js) [NEW]**
    *   *Change:* Created a schema capturing: `listing` (ObjectId ref), `user` (ObjectId ref), `checkIn` (Date), `checkOut` (Date), `guests` (Number), `totalPrice` (Number), and `createdAt` timestamp.
    *   *Why:* To maintain structured records of bookings linking properties and reserving users.

### 2. View & UI Files
*   **[views/listings/show.ejs](file:///c:/Users/Shashank%20Shekhar/Desktop/projects/WanderNest/views/listings/show.ejs)**
    *   *Change:* Restructured layout to place the Listing details card on the left (`col-lg-5`) and a sticky Booking Widget on the right (`col-lg-3`). Added a client-side JavaScript calculator that automatically computes base rates, WanderNest service fees, and renders a checkout invoice when dates are input. Enabled conditional button displays: "Reserve" if logged in (non-owner), "You Own This Listing" (disabled) if owner, and "Log in to Book" if guest is anonymous.
    *   *Why:* To make the details page highly responsive and functional, matching modern web booking standards like Airbnb.
*   **[views/bookings/index.ejs](file:///c:/Users/Shashank%20Shekhar/Desktop/projects/WanderNest/views/bookings/index.ejs) [NEW]**
    *   *Change:* Created the "My Bookings" dashboard. It displays reservation details, formatted dates, prices, and an outline "Cancel Reservation" form that triggers a DELETE request.
    *   *Why:* To give users a centralized dashboard to track and cancel stays.
*   **[views/includes/navbar.ejs](file:///c:/Users/Shashank%20Shekhar/Desktop/projects/WanderNest/views/includes/navbar.ejs)**
    *   *Change:* Added the "My Bookings" navbar link, visible only when a user session exists (`currUser`).
    *   *Why:* To provide seamless navigation to the bookings panel.

### 3. Controller & Route Files
*   **[controllers/booking.js](file:///c:/Users/Shashank%20Shekhar/Desktop/projects/WanderNest/controllers/booking.js) [NEW]**
    *   *Change:* Created actions:
        *   `createBooking`: Performs date integrity checks (dates in future, checkout > checkin), prevents owners from booking their listings, runs a MongoDB overlap query to prevent double bookings, calculates prices, and saves records.
        *   `listBookings`: Returns bookings for the logged-in user, populating listing details.
        *   `cancelBooking`: Authorizes booking ownership before deleting the reservation.
    *   *Why:* To encapsulate business logic securely and prevent database integrity issues.
*   **[routes/booking.js](file:///c:/Users/Shashank%20Shekhar/Desktop/projects/WanderNest/routes/booking.js) [NEW]**
    *   *Change:* Mounted endpoints `POST /` (creates reservation), `GET /` (list bookings), and `DELETE /:bookingId` (cancellations). All routes are wrapped in `isLoggedIn` middleware.
    *   *Why:* To expose endpoints and protect them from unauthorized access.
*   **[app.js](file:///c:/Users/Shashank%20Shekhar/Desktop/projects/WanderNest/app.js)**
    *   *Change:* Required `booking.js` routes and mounted them on `/listings/:id/bookings` and `/bookings`.
    *   *Why:* To expose routes globally across the Express application instance.
