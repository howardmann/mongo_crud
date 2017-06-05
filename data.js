var mongoose = require('mongoose');

// Using mongoose to connect to MLAB database (Create new database single node free and create new user and set name and password)
mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds163681.mlab.com:63681/mongo-crud');

// Create schema for Student collection
var Schema = mongoose.Schema;
var StudentSchema = new Schema({
  name: String,
  age: Number
});

// Create new student collection
var Student = mongoose.model('Student', StudentSchema);

module.exports = Student;