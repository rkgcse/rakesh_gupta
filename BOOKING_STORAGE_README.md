# Booking Data Storage System

## Overview
This system stores appointment booking data from the website in a JSON file for later retrieval and management.

## Files Created

### 1. **api/bookings.js**
This is the core module that handles all booking operations:
- `saveBooking(bookingData)` - Saves a new booking with timestamp and unique ID
- `getAllBookings()` - Retrieves all bookings from the storage file
- `getBookingById(bookingId)` - Retrieves a specific booking by ID
- `deleteBooking(bookingId)` - Deletes a booking by ID

**Storage Location:** `data/bookings.json`

### 2. **api/bookings-handler.js**
This is the Vercel serverless function that handles HTTP requests:
- **POST** - Submits new booking data (called from the form)
- **GET** - Retrieves all bookings or a specific booking by ID
- **DELETE** - Removes a booking by ID
- **OPTIONS** - Handles CORS preflight requests

### 3. **data/bookings.json**
The JSON file that stores all appointment bookings. It's automatically created on first use.

**Sample Structure:**
```json
[
  {
    "id": 1704067200000,
    "timestamp": "2024-01-01T12:00:00.000Z",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91 9876543210",
    "doctor": "rakesh-gupta",
    "date": "2024-01-15",
    "time": "10:00",
    "reason": "General checkup"
  }
]
```

## How It Works

1. **User submits form** on the website
2. **JavaScript sends POST request** to `/api/bookings-handler`
3. **Server receives data** and calls `saveBooking()`
4. **Data is stored** in `data/bookings.json` with:
   - Unique ID (timestamp)
   - Current timestamp
   - All form fields
5. **Confirmation sent** back to user

## API Endpoints

### Submit Booking
```
POST /api/bookings-handler
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 9876543210",
  "doctor": "rakesh-gupta",
  "date": "2024-01-15",
  "time": "10:00",
  "reason": "General checkup"
}
```

### Get All Bookings
```
GET /api/bookings-handler
```

### Get Specific Booking
```
GET /api/bookings-handler?id=1704067200000
```

### Delete Booking
```
DELETE /api/bookings-handler?id=1704067200000
```

## Data Location
All bookings are stored in: **`data/bookings.json`**

This file is automatically created in the `data` directory on the first booking submission.
