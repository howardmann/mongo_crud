var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// Import DATA
var Student = require('./data');

// Index
router.get('/', function(req, res, next){
  Student.find({})
    .then((data) => res.render('index', {data}))
    .catch(err => console.log(err))
});

// New
router.get('/new', function(req, res, next){
  res.render('new');
});

// Create
router.post('/create', function(req, res, next){
  var newStudent = new Student({
    name: req.body.name,
    age: req.body.age
  });

  newStudent.save()
    .then(() => res.redirect('/'))
    .catch(err => console.log(err));
});

// Edit
router.get('/student/:id/edit', function(req, res, next){
  Student.findById(req.params.id)
    .then((result) => res.render('edit', {data: result}))
    .catch(() => next());
});

// Show
router.get('/student/:id', function(req, res, next){
  Student.findById(req.params.id)
    .then((result) => res.render('show', {data: result}))
    .catch(() => next());
});

// Update
router.put('/student/:id', function(req, res, next){
  Student.findByIdAndUpdate(req.params.id, { 
    $set: { 
      name: req.body.name,
      age: req.body.age
    }
  }, { 
    new: true 
  })
  .then((result) => res.redirect('/'))
  .catch(err => {
    console.log(err);
    next()
  });
});

// Delete
router.delete('/student/:id', function(req, res, next){
  Student.findById(req.params.id)
    .then((result) => result.remove())
    .then(() => res.redirect('/'))
    .catch(() => next());
});

module.exports = router;