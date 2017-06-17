var mongoose = require('../db/connection.js');

// Setters are intended to modify the underlying raw data. Getters are intended to transform (but not modify at the raw data level) the underlying raw data into something that the user expects to see. They are both defined in the Schema definition.
// http://mongoosejs.com/docs/2.7.x/docs/getters-setters.html
// Custom setters example. Pass in custom setter functions to the set property in schema. Will manipulate data being submitted before saving
var toLowerCase = function(value){
  return value.toLowerCase();
};

// Custom getters example. Pass in custom getter, will manipulate data before returning. Default json will display raw value, this is merely a model view helper. To set the json, set additional property
var humanAge = function (value){
  return `${value} years old`;
} 

// Create schema for Student collection
var Schema = mongoose.Schema;
var StudentSchema = new Schema({
  name: {
    type: String,
    set: toLowerCase
  },
  age: {
    type: Number,
    get: humanAge    
  },
  fun: {
    type: Boolean,
    default: false
  }
});

// Create new student collection
var Student = mongoose.model('Student', StudentSchema);

module.exports = Student;