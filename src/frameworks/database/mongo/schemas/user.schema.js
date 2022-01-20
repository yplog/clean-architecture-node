const mongoose = require('mongoose');

const { Schema } = mongoose;

module.exports = new Schema({
  username: String,
  gender: Number,
  deletedAt: Date,
  updatedAt: Date
});