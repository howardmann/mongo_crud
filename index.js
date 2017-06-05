var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var methodOverride = require('method-override');

var app = express();

// Set view engine
app.engine('hbs', exphbs({defaultLayout: 'main.hbs'}));
app.set('view engine', 'hbs');

// Set bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Method override to submit PUT and DELETE html form requests
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

// Routes 
app.use(require('./routes.js'));

// 404
app.get(function(req, res){
  res.status(404).send('Page does not exist');
});

// Expose and listen
app.listen(3000, function(){
  console.log('Listening to port 3000');
});
