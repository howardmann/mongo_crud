var express = require('express');
var router = express.Router();

// Movie CRUD
var movies = require('./movies.js');
router
  .get('/movies', movies.index)
  .post('/movies', movies.create)
  .get('/movies/:id', movies.show)
  .put('/movies/:id', movies.update)
  .delete('/movies/:id', movies.delete)

// Users CRUD
var users = require('./users.js');
router
  .get('/users', users.index)
  .post('/users', users.create)
  .get('/users/:id', users.show)
  .put('/users/:id', users.update)
  .delete('/users/:id', users.delete)


module.exports = router;