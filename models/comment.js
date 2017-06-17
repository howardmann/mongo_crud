var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var MovieSchema = new Schema({
  title: String,
  year: Number,
});

var Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;