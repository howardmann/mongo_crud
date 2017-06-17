var mongoose = require('../db/connection.js');

var Schema = mongoose.Schema;
var MovieSchema = new Schema({
  title: String,
  year: Number,
});

var Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;