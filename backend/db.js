const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
// let connectionString = `mongodb+srv://talhaimran:talha157@cluster0.u8ext.gcp.mongodb.net/ConnectDev?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    mongoose.connect(process.env.CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('Database Connected!');
    return true;
  } catch (err) {
    console.log('Could not connect to the database!', err.message);
    return false;
  }
};

module.exports = connectDB;
