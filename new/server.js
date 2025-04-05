const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize app
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/carMarketplace', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define Car schema
const carSchema = new mongoose.Schema({
    manufacturer: String,
    model: String,
    year: String,
    category: String,
    fuelType: String,
    engineVolume: Number,
    price: Number,
    mileage: String,
    description: String,
    title: String,
    color: String,
    location: String,
    contact: {
        name: String,
        email: String,
        phone: String,
    },
    photos: [String],
    dateAdded: { type: Date, default: Date.now },
});

// Create Car model
const Car = mongoose.model('Car', carSchema);

// API Endpoints
app.post('/api/cars', async (req, res) => {
    try {
        const car = new Car(req.body);
        await car.save();
        res.status(201).json(car);
    } catch (error) {
        res.status(500).json({ error: 'Failed to save car data' });
    }
});

app.get('/api/cars', async (req, res) => {
    try {
        const cars = await Car.find();
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch car data' });
    }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
