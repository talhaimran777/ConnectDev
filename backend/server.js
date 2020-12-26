const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const app = express();

dotenv.config();

app.get('/', (req, res) => {
  // res.send('Api working fine!');
  res.json({ developerName: 'Talha Imran', age: 23 , gender: "Male"});
});

const PORT = process.env.PORT || 5000;

if (connectDB()) {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}
