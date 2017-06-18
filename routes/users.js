var mongoose = require('mongoose');
var User = require('../models/user');
var Movie = require('../models/movie');

exports.index = function(req, res, next){
  User.find({})
    .then(data => res.send(data))
    .catch(next)
};

exports.create = function(req, res, next){
  User.create(req.body)
    .then(data => res.send(data))
    .catch(next);
};

exports.show = function(req, res, next){
  Promise.all([
    User.findById(req.params.id),
    Movie.find({"comments.user":req.params.id}),
  ])
  .then(([user, movies]) => {
    let movieComments = filterUserComments(user,movies);
    res.send({user, movieComments});
  })
  .catch(next);
};

exports.update = function(req, res, next){
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(data => res.send(data))
    .catch(next);
};

exports.delete = function(req, res, next){
  User.findByIdAndRemove(req.params.id)
    .then(data => res.send(data))
    .catch(next);
};

/**
 * Filters movie array for comments belonging to user
 * @param {Object} user 
 * @param {Object} movies 
 * @return {Object} transformed movies object
 */
function filterUserComments(user, movies) {
  return movies.map(movie => {
    movie.comments = movie.comments.filter(comment => comment.user == user.id);
    return movie;
  });
};