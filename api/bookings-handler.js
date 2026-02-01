const bookingsModule = require('../../api/bookings');

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    // Save new booking
    const result = bookingsModule.saveBooking(req.body);
    return res.status(result.success ? 200 : 400).json(result);
  }

  if (req.method === 'GET') {
    // Get all bookings or a specific booking by ID
    const { id } = req.query;
    
    if (id) {
      const booking = bookingsModule.getBookingById(id);
      if (booking) {
        return res.status(200).json(booking);
      } else {
        return res.status(404).json({ message: 'Booking not found' });
      }
    }

    const bookings = bookingsModule.getAllBookings();
    return res.status(200).json(bookings);
  }

  if (req.method === 'DELETE') {
    // Delete a booking by ID
    const { id } = req.query;
    
    if (!id) {
      return res.status(400).json({ message: 'Booking ID is required' });
    }

    const result = bookingsModule.deleteBooking(id);
    return res.status(result.success ? 200 : 400).json(result);
  }

  res.status(405).json({ message: 'Method not allowed' });
}
