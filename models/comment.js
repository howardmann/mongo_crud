var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  comment: String,
  rating: {
    type: Number,
    default: 3
  }
});

module.exports = CommentSchema;