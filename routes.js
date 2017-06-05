var express = require('express');
var router = express.Router();

// Import DATA
var DATA = require('./data');

// Index
router.get('/', function(req, res, next){
  res.render('index', {
    data: DATA
  });
});

// New
router.get('/new', function(req, res, next){
  res.render('new');
});

// Create
router.post('/create', function(req, res, next){
  var newStudent = {
    id: DATA.length + 1,
    name: req.body.name,
    age: req.body.age
  }

  DATA.push(newStudent);

  res.redirect('/');
});

// Edit
router.get('/student/:id/edit', function(req, res, next){
  var student = DATA.filter((el) => el.id == req.params.id);
  if (student.length === 0) { return next()}
  res.render('edit', {data: student[0]});
})

// Show
router.get('/student/:id', function(req, res, next){
  var student = DATA.filter((el) => el.id == req.params.id);
  if (student.length === 0) { return next()}
  res.render('show', {data: student[0]});
});

// Update
router.put('/student/:id', function(req, res, next){
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
router.delete('/student/:id', function(req, res, next){
  var student = DATA.filter((el) => el.id == req.params.id);
  if (student.length === 0) { return next()}  
  var studentId = student[0].id;
  DATA = DATA.filter((el) => el.id !== studentId)

  res.render('index', {data: DATA});
});

module.exports = router;