const express = require('express');
const cors = require('cors');
const app = express();
const vehiclesRoutes = require('./api/vehicles');

app.use(cors());
app.use(express.json());

app.use('/vehicles', vehiclesRoutes);

app.listen(5000, () => console.log('Backend running on http://localhost:5000'));
