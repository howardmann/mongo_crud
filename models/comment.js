var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var CommentSchema = new Schema({
  comment: String,
  rating: {
    type: Number,
    default: 3
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = CommentSchema;