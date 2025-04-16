const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./vehicles.db');

db.serialize(() => {
    db.run(`
    CREATE TABLE IF NOT EXISTS vehicles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      make TEXT NOT NULL,
      model TEXT NOT NULL,
      year INTEGER,
      vin TEXT,
      license_plate TEXT
    );
  `);
});

module.exports = db;
