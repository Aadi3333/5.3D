const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

mongoose.connect('mongodb://54.92.168.141/task');
mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

const SensorData = mongoose.model('sensorData', {
  data: Number,
  timestamp: { type: Date, default: Date.now },
});

app.use(bodyParser.json());

app.get('/api/test', async (req, res) => {
    res.status(200).send('API Test Success')
})

app.post('/api/sensorData', async (req, res) => {
  try {
    const { data } = req.body;
    const sensorData = new SensorData({ data });
    await sensorData.save();
    res.status(201).json(sensorData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
