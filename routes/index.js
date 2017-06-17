var express = require('express');
var router = express.Router();
var movies = require('./movies.js');

// Movie CRUD
router
  .get('/movies', movies.index)
  .post('/movies', movies.create)
  .get('/movies/:id', movies.show)
  .put('/movies/:id', movies.update)
  .delete('/movies/:id', movies.delete)

module.exports = router;