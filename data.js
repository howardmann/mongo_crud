var mongoose = require('mongoose');

// Use ES6 Promises for mongoose
mongoose.Promise = global.Promise;

// Set environment variables
var username = process.env.MONGO_USER;
var password = process.env.MONGO_PW;

// Using mongoose to connect to MLAB database (Create new database single node free and create new user and set name and password)
mongoose.connect(`mongodb://${username}:${password}@ds163681.mlab.com:63681/mongo-crud`);
// Signal connection
mongoose.connection.once('open', function(){
  console.log('Connection has been made');
}).on('error', function(error){
  console.log('Connect error', error);
})

// Create schema for Student collection
var Schema = mongoose.Schema;
var StudentSchema = new Schema({
  name: String,
  age: Number,
  fun: {
    type: Boolean,
    default: false
  }
});

// Create new student collection
var Student = mongoose.model('Student', StudentSchema);

module.exports = Student;