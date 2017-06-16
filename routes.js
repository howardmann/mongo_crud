var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// Import DATA
var Student = require('./data');

// RESTFUL STUDENTS ROUTES
// Index
router.get('/students', function(req, res, next){
  Student.find({})
    .then(data => res.send(data))
    .catch(next)
});

// Create
router.post('/students', function(req, res, next){
  Student.create(req.body)
    .then(data => res.send(data))
    .catch(next);
});

// Show
router.get('/student/:id', function(req, res, next){
  Student.findById(req.params.id)
    .then((data) => {
      console.log(data.age);
      res.send(data)
    })
    .catch(next);
});

// Update
router.put('/student/:id', function(req, res, next){
  Student.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(data => res.send(data))
    .catch(next);
});

// Delete
router.delete('/student/:id', function(req, res, next){
  Student.findByIdAndRemove(req.params.id)
    .then(data => res.send(data))
    .catch(next);
});

module.exports = router;