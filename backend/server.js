const express = require('express');
const connectDB = require('./db');
const app = express();

app.get('/', (req, res) => {
  res.send('Api working fine!');
});

const PORT = process.env.PORT || 5000;

if (connectDB()) {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}
