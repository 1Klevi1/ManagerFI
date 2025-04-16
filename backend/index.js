const express = require('express');
const cors = require('cors');
const app = express();
const vehiclesRoutes = require('./api/vehicles');
const path = require('path');

app.use(cors());
app.use(express.json());

app.use('/vehicles', vehiclesRoutes);

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.listen(5000, () => console.log('Backend running on http://localhost:5000'));
