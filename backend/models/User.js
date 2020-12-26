const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: string,
      required: true,
    },
    email: {
      type: string,
      required: true,
      unique: true,
    },
    password: {
      type: string,
      required: true,
    },
    avatar: {
      type: string,
    },
    data: {
      type: Data,
      default: Data.now(),
    },
  },
  {
    collection: 'users',
  }
);

const model = mongoose.model('user', UserSchema);

module.exports = model;
