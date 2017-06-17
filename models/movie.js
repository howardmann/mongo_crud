var mongoose = require('mongoose');
var CommentSchema = require('./comment.js');

var MovieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  comments: [CommentSchema]
});

var Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;