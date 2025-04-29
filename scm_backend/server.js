const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static frontend files (e.g., index.html, main.js, css/)
const publicPath = path.join(__dirname, '..'); // Assuming 'scmbackend/server.js' structure
app.use(express.static(publicPath));

// Route: Serve booking.html (second booking page)
app.get('/booking', (req, res) => {
    res.sendFile(path.join(publicPath, 'booking.html'));
});

// POST: Second booking (detailed info)
app.post('/book-room', (req, res) => {
    const { name, email, checkIn, checkOut, adults, children, room, request } = req.body;

    console.log('\n📥 Booking 2 Received:');
    console.log({ name, email, checkIn, checkOut, adults, children, room, request });

    // Validation
    if (!name || !email || !checkIn || !checkOut || !adults || !children || !room) {
        return res.status(400).json({ message: 'Please fill in all required fields.' });
    }

    // Success
    res.status(201).json({ message: '✅ Booking received successfully!' });
});

// General error handler
app.use((err, req, res, next) => {
    console.error('❌ Server Error:', err.stack);
    res.status(500).json({ message: 'Something went wrong. Please try again later.' });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running at: http://localhost:${PORT}`);
});
