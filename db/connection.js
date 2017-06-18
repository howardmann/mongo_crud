var mongoose = require('mongoose');

// Use ES6 Promises for mongoose
mongoose.Promise = global.Promise;

// Set environment variables
var config  = process.env.NODE_ENV || 'development';

exports.connect = function(){
  if (config === 'development' ) {
    mongoose.connect('mongodb://localhost:27017/mongo-population');
  } else {
    // Using mongoose to connect to MLAB database (Create new database single node free and create new user and set name and password)
    const username = process.env.MONGO_USER;
    const password = process.env.MONGO_PW;
    mongoose.connect(`mongodb://${username}:${password}@ds131432.mlab.com:31432/mongo-population`);
  }

  // Signal connection
  mongoose.connection.once('open', function(){
    console.log('Connection has been made');
  }).on('error', function(error){
    console.log('Connect error', error);
  })
};