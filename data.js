var mongoose = require('mongoose');

// Use ES6 Promises for mongoose
mongoose.Promise = global.Promise;

// Set environment variables
var config  = process.env.NODE_ENV;

if (config === 'development' ) {
  mongoose.connect('mongodb://localhost:27017/mongo-crud');
} else {
  // Using mongoose to connect to MLAB database (Create new database single node free and create new user and set name and password)
  const username = process.env.MONGO_USER;
  const password = process.env.MONGO_PW;
  mongoose.connect(`mongodb://${username}:${password}@ds163681.mlab.com:63681/mongo-crud`);
}

// Signal connection
mongoose.connection.once('open', function(){
  console.log('Connection has been made');
}).on('error', function(error){
  console.log('Connect error', error);
})

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