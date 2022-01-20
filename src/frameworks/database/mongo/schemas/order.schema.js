const mongoose = require('mongoose');
const { Schema, ObjectId } = mongoose;

module.exports = new Schema({
  userId: ObjectId,
  productIds: Array(ObjectId),
  date: Date,
  isPayed: Boolean,

  deletedAt: Date,
  updatedAt: Date
});