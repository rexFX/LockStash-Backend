const mongoose = require('mongoose');

const User = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  salt: {
    type: String,
    required: true,
  },
  verifier: {
    type: String,
    required: true,
  },
  tempEphemeral: {
    type: String,
  },
});

module.exports = mongoose.model('User', User);
