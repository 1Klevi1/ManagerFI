const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all vehicles
router.get('/', (req, res) => {
    db.all('SELECT * FROM vehicles', (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Add new vehicle
router.post('/', (req, res) => {
    const { make, model, year, vin, license_plate } = req.body;
    const stmt = db.prepare(`
    INSERT INTO vehicles (make, model, year, vin, license_plate)
    VALUES (?, ?, ?, ?, ?)
  `);
    stmt.run([make, model, year, vin, license_plate], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID });
    });

    // In vehicles.js (inside the POST route)
    console.log("Vehicle added:", { make, model, year, vin, license_plate });

});
// Update vehicle
router.patch('/:id', (req, res) => {
    const { make, model, year, vin, license_plate } = req.body;
    const { id } = req.params;
    const query = `
    UPDATE vehicles SET make = ?, model = ?, year = ?, vin = ?, license_plate = ?
    WHERE id = ?
  `;
    db.run(query, [make, model, year, vin, license_plate, id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ updated: this.changes });
    });
});
// Delete vehicle
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM vehicles WHERE id = ?', [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ deleted: this.changes });
    });
});


module.exports = router;
