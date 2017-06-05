var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var methodOverride = require('method-override');

// Temporary data
var DATA = require('./data');

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
// Index
app.get('/', function(req, res, next){
  res.render('index', {
    data: DATA
  });
});

// New
app.get('/new', function(req, res, next){
  res.render('new');
});

// Create
app.post('/create', function(req, res, next){
  var newStudent = {
    id: DATA.length + 1,
    name: req.body.name,
    age: req.body.age
  }

  DATA.push(newStudent);

  res.redirect('/');
});

// Edit
app.get('/student/:id/edit', function(req, res, next){
  var student = DATA.filter((el) => el.id == req.params.id);
  if (student.length === 0) { return next()}
  res.render('edit', {data: student[0]});
})

// Show
app.get('/student/:id', function(req, res, next){
  var student = DATA.filter((el) => el.id == req.params.id);
  if (student.length === 0) { return next()}
  res.render('show', {data: student[0]});
});

// Update
app.put('/student/:id', function(req, res, next){
  var student = DATA.filter((el) => el.id == req.params.id);
  if (student.length === 0) { return next()}  
  var studentId = student[0].id;
  
  var updatedStudent = {
    id: studentId,
    name: req.body.name,
    age: req.body.age
  }

  DATA = DATA.filter((el) => el.id !== studentId)
  DATA.push(updatedStudent);
  res.render('index', {data: DATA});
});

// Delete
app.delete('/student/:id', function(req, res, next){
  var student = DATA.filter((el) => el.id == req.params.id);
  if (student.length === 0) { return next()}  
  var studentId = student[0].id;
  DATA = DATA.filter((el) => el.id !== studentId)

  res.render('index', {data: DATA});
});

// 404
app.get(function(req, res){
  res.status(404).send('Page does not exist');
});

// Expose and listen
app.listen(3000, function(){
  console.log('Listening to port 3000');
});
