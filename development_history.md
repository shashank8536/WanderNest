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

---

## 📅 Phase 3: Advanced Authentication & Email Stack (Completed 🟢)
**Goal:** Add email verification, OTP generation, password recovery, and transaction-related booking emails.

*   **Step 1: Install Dependencies & Update User Schema** (Completed 🟢)
    *   *Details:* Installed `nodemailer`. Updated [models/user.js](file:///c:/Users/Shashank%20Shekhar/Desktop/projects/WanderNest/models/user.js) with fields `isVerified`, `otp`, `otpExpiry`, `resetOtp`, and `resetOtpExpiry`.
*   **Step 2: Create the Mailer Utility** (Completed 🟢)
    *   *Details:* Created [utils/mailer.js](file:///c:/Users/Shashank%20Shekhar/Desktop/projects/WanderNest/utils/mailer.js) to configure the nodemailer transporter with Gmail credentials and exported it.
*   **Step 3: Create the OTP Generator Utility** (Completed 🟢)
    *   *Details:* Created [utils/otpGenerator.js](file:///c:/Users/Shashank%20Shekhar/Desktop/projects/WanderNest/utils/otpGenerator.js) containing `generateOTP()` to create 6-digit random codes. Removed temporary export lines.
*   **Step 4: Write Mailer Helper Functions** (Completed 🟢)
    *   *Details:* Added `sendOTPEmail`, `sendResetOTPEmail`, `sendBookingConfirmationEmail`, and `sendBookingCancellationEmail` inside [utils/mailer.js](file:///c:/Users/Shashank%20Shekhar/Desktop/projects/WanderNest/utils/mailer.js).
*   **Step 5: Update the Signup & Verification Flow** (Completed 🟢)
    *   *Details:* 
        *   Fixed bugs in [utils/otpGenerator.js](file:///c:/Users/Shashank%20Shekhar/Desktop/projects/WanderNest/utils/otpGenerator.js) and [utils/mailer.js](file:///c:/Users/Shashank%20Shekhar/Desktop/projects/WanderNest/utils/mailer.js) to clean up exports.
        *   Updated `signup` in [controllers/users.js](file:///c:/Users/Shashank%20Shekhar/Desktop/projects/WanderNest/controllers/users.js) to generate a 6-digit OTP, send it to the user's email, store the verification context in the session, and redirect to the OTP verification page.
        *   Implemented `renderVerifyOtpForm`, `verifyOtp`, and `resendOtp` actions in [controllers/users.js](file:///c:/Users/Shashank%20Shekhar/Desktop/projects/WanderNest/controllers/users.js) to handle OTP checks, account activation, and resending OTPs.
        *   Updated `login` in [controllers/users.js](file:///c:/Users/Shashank%20Shekhar/Desktop/projects/WanderNest/controllers/users.js) to enforce verification status: unverified logins trigger a fresh OTP verification flow.
        *   Mounted verification routes (`GET /verify-otp`, `POST /verify-otp`, and `POST /resend-otp`) in [routes/user.js](file:///c:/Users/Shashank%20Shekhar/Desktop/projects/WanderNest/routes/user.js).
        *   Updated [views/users/verifyOtp.ejs](file:///c:/Users/Shashank%20Shekhar/Desktop/projects/WanderNest/views/users/verifyOtp.ejs) to add a modern, centered Resend OTP form.

---

## 📅 Phase 4: Custom Logo Integration (Completed 🟢)
**Goal:** Integrate the custom W logo icon designed using Stitch, ensuring high quality, transparent backgrounds, and compatible navbar styling.

### 1. Logo Asset Preparation
*   **Asset Processing (`Pillow` Python Library):**
    *   *Change:* Re-downloaded the Stitch-designed brand logo (`logo_opt3.png`). Created and executed a python script using the `Pillow` library to isolate only the W logo icon mark from the left half of the image (limiting bounding box scans to `maxX=188` to avoid capturing overlapping text). Keyed out the white background pixels to transparent, saving the final PNG directly to `public/logo.png`.
    *   *Why:* JPEGs do not support transparency, which would look poor on dark/light shifting themes. Splitting the logo icon and text allows scaling the icon independently, keeping the brand text crisp and scalable via HTML.

### 2. View & UI Files
*   **[views/includes/navbar.ejs](file:///c:/Users/Shashank%20Shekhar/Desktop/projects/WanderNest/views/includes/navbar.ejs)**
    *   *Change:* Replaced the generic FontAwesome compass icon (`<i class="fa-solid fa-compass"></i>`) with the custom transparent `logo.png` image tag.
    *   *Styling:*
        *   Logo size set to `height: 48px; width: auto;`.
        *   Logo spacing adjusted using `.logo` class with `margin-right: 8px`.
        *   Brand font-size bumped to `1.7rem` with `font-weight: 700` (bold).
        *   Vertically center-aligned elements using `display: flex; align-items: center;`.
        *   Set outer brand container gap to `gap-4` to let the brand breathe.
    *   *Why:* To make the brand prominent and professionally balanced against other elements like the search bar, while keeping spacing compact.

---

## 📅 Phase 5: AI Travel Assistant UI (Completed 🟢)
**Goal:** Create a comprehensive, premium UI for the AI Travel Assistant to let users plan their itineraries, check weather forecasts, track packing essentials, and see recommended stays.

### 1. View & UI Files
*   **[views/listings/travel-assistant.ejs](file:///c:/Users/Shashank%20Shekhar/Desktop/projects/WanderNest/views/listings/travel-assistant.ejs) [NEW]**
    *   *Change:* Built a full travel planner template featuring:
        *   **Hero Section:** Welcoming header introducing the AI Travel Assistant.
        *   **Interactive Form:** Inputs for Destination, Budget Range, Duration, Month of Travel, and Travel Type (using custom pill buttons).
        *   **Weather Forecast Widget:** Renders temperature, weather conditions, rain probability, and wind metrics.
        *   **Dynamic Packing Checklist:** Checklist items that keep track of packed essentials with a progress counter.
        *   **Detailed Itinerary Timeline:** Interactive day-by-day itinerary layout mapping travel timings and events.
        *   **Recommended Stays:** Tailored WanderNest listings recommending options for the selected trip.
        *   **Smart Alternatives:** Cards suggesting nearby alternative destinations (e.g., Hakone and Nikko for Tokyo).
    *   *Why:* To deliver a state-of-the-art travel planner that enhances user retention and matches the premium booking experience of modern travel applications.
*   **[views/includes/navbar.ejs](file:///c:/Users/Shashank%20Shekhar/Desktop/projects/WanderNest/views/includes/navbar.ejs)**
    *   *Change:* Added a nav link pointing to `/travel-assistant` labeled "AI Travel Assistant ✨".
    *   *Why:* To ensure the assistant is easily discoverable from any page of the site.

### 2. Styling & Frontend Scripts
*   **[public/css/aiTravel.css](file:///c:/Users/Shashank%20Shekhar/Desktop/projects/WanderNest/public/css/aiTravel.css) [NEW]**
    *   *Change:* Wrote custom CSS styles implementing glassmorphism, responsive grids, interactive hover effects, timeline connectors/bullets, weather status card backgrounds, custom input styling, and layout aesthetics.
    *   *Why:* To keep the look modern and visual-first without bloating the core template style sheet.
*   **[public/js/aiTravel.js](file:///c:/Users/Shashank%20Shekhar/Desktop/projects/WanderNest/public/js/aiTravel.js) [NEW]**
    *   *Change:* Added dynamic UI behavior:
        *   Handled the selection state and values for travel-type pills.
        *   Programmed the interactive packing checklist to toggle checks, update lists, and recalculate packing progress in real time (e.g., "4/8 Packed").
    *   *Why:* To make the frontend highly responsive and interactive.

### 3. Server-side Route Integration
*   **[app.js](file:///c:/Users/Shashank%20Shekhar/Desktop/projects/WanderNest/app.js)**
    *   *Change:* Mounted a GET route `/travel-assistant` rendering the `listings/travel-assistant.ejs` view.
    *   *Why:* To expose the page to the web server and enable navigation.
