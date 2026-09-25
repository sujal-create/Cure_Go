const express = require('express');
const router = express.Router();

// POST /api/ambulance - simple booking accepting location and notes
router.post('/', async (req, res) => {
  try {
    const { location, medicalCondition } = req.body;
    if (!location) return res.status(400).json({ message: 'Location required' });

    // For now just acknowledge booking. In production persist and notify dispatch.
    const booking = {
      id: `amb-${Date.now()}`,
      location,
      medicalCondition: medicalCondition || '',
      provider: 'Cure Go Ambulance',
      etaMinutes: 12,
      createdAt: new Date(),
    };

    console.log('Ambulance booking', booking);
    res.json({ success: true, booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
