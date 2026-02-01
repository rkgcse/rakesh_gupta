const fs = require('fs');
const path = require('path');

// Path to store bookings data
const bookingsFile = path.join(__dirname, '../data/bookings.json');
const dataDir = path.join(__dirname, '../data');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize bookings file if it doesn't exist
if (!fs.existsSync(bookingsFile)) {
  fs.writeFileSync(bookingsFile, JSON.stringify([], null, 2));
}

/**
 * Save booking to file
 * @param {Object} bookingData - The booking details
 * @returns {Object} - Response object
 */
function saveBooking(bookingData) {
  try {
    // Read existing bookings
    const existingData = fs.readFileSync(bookingsFile, 'utf-8');
    const bookings = JSON.parse(existingData);

    // Create new booking with timestamp
    const newBooking = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...bookingData
    };

    // Add to bookings array
    bookings.push(newBooking);

    // Write back to file
    fs.writeFileSync(bookingsFile, JSON.stringify(bookings, null, 2));

    return {
      success: true,
      message: 'Booking saved successfully',
      bookingId: newBooking.id
    };
  } catch (error) {
    console.error('Error saving booking:', error);
    return {
      success: false,
      message: 'Error saving booking: ' + error.message
    };
  }
}

/**
 * Get all bookings
 * @returns {Array} - Array of all bookings
 */
function getAllBookings() {
  try {
    const data = fs.readFileSync(bookingsFile, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading bookings:', error);
    return [];
  }
}

/**
 * Get booking by ID
 * @param {number} bookingId - The booking ID
 * @returns {Object|null} - Booking object or null
 */
function getBookingById(bookingId) {
  try {
    const bookings = getAllBookings();
    return bookings.find(booking => booking.id === parseInt(bookingId)) || null;
  } catch (error) {
    console.error('Error retrieving booking:', error);
    return null;
  }
}

/**
 * Delete booking by ID
 * @param {number} bookingId - The booking ID
 * @returns {Object} - Response object
 */
function deleteBooking(bookingId) {
  try {
    let bookings = getAllBookings();
    const initialLength = bookings.length;
    bookings = bookings.filter(booking => booking.id !== parseInt(bookingId));

    if (bookings.length === initialLength) {
      return {
        success: false,
        message: 'Booking not found'
      };
    }

    fs.writeFileSync(bookingsFile, JSON.stringify(bookings, null, 2));

    return {
      success: true,
      message: 'Booking deleted successfully'
    };
  } catch (error) {
    console.error('Error deleting booking:', error);
    return {
      success: false,
      message: 'Error deleting booking: ' + error.message
    };
  }
}

module.exports = {
  saveBooking,
  getAllBookings,
  getBookingById,
  deleteBooking
};
