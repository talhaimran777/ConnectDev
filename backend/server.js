const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const app = express();

dotenv.config();

app.get('/', (req, res) => {
  res.send('Api working fine!');
  // res.json({ developerName: 'Talha Imran', age: 23 , gender: "Male"});
});

// Setting up backend routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));

// Setting up port
const PORT = process.env.PORT || 5000;

if (connectDB()) {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}
