var mongoose = require('mongoose');
var Movie = require('../models/movie');

exports.index = function(req, res, next){
  Movie.find({})
    .then(data => res.send(data))
    .catch(next)
};

exports.create = function(req, res, next){
  Movie.create(req.body)
    .then(data => res.send(data))
    .catch(next);
};

exports.show = function(req, res, next){
  Movie.findById(req.params.id)
    .populate('comments.user', 'name')
    .then((data) => {
      res.send(data)
    })
    .catch(next);
};

exports.update = function(req, res, next){
  Movie.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(data => res.send(data))
    .catch(next);
};

exports.delete = function(req, res, next){
  Movie.findByIdAndRemove(req.params.id)
    .then(data => res.send(data))
    .catch(next);
};