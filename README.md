# Bike Parking Management System

A full-stack application to manage a bike stand parking system.

## Setup Instructions

### 1. Database Setup
1. Open XAMPP/WAMP.
2. Start Apache and MySQL.
3. Open `http://localhost/phpmyadmin`.
4. Import the `backend/database.sql` file.

### 2. Backend Setup
The backend runs on PHP. You can serve it using the built-in PHP server or copy the files to your `htdocs` directory.
1. Open a terminal in `d:\CRM\bike-parking\backend`.
2. Run: `php -S localhost:8000`
   *(This ensures the API runs on port 8000, which the React app is configured to use).*

### 3. Frontend Setup
1. Open a terminal in `d:\CRM\bike-parking\frontend`.
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`

### Features
- Record bike entry with timestamp.
- Process exit, calculate fee (₹10/hr minimum).
- Admin dashboard to view and filter all vehicles.
