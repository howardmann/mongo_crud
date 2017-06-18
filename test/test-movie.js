var chai = require('chai');
var app = require('../server.js');
var chaiHttp = require('chai-http');
var should = chai.should();
var expect = chai.expect;
var mongoose = require('mongoose');
var Movie = require('../models/movie')
chai.use(chaiHttp);

// Modify mongoose CREATE to wrap it around a promise, call it seed. This allows us to use promise.all
mongoose.Model.seed = function(entities) {  
  var promise = new Promise((resolve, reject) => {
    this.create(entities, function(err) {
      if(err) { reject(err); }
      else    { resolve(); }
    });
  });
  return promise;
};

var seedDatabase = function(done){
  let jaws = Movie.seed({title: 'Jaws', year: 1970});
  let alien = Movie.seed({title: 'Alien', year: 1970});
  let gladiator = Movie.seed({title: 'Gladiator', year: 2000});
  let jurassic = Movie.seed({title: 'Jurassic Park', year: 1995});

  Promise.all([jaws, alien, gladiator, jurassic])
    .then(() => done());
};
// Drop the collection and reseed database
beforeEach(function(done){
  mongoose.connection.collections.movies.drop(function(){
    seedDatabase(done);
  });
});

describe('Movie', function(){
  it('should list ALL movies on /movies GET', function(done){
    chai.request(app)
      .get('/movies')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.equal(4);
        res.body[0].should.be.a('object');
        res.body[0].should.have.property('title');
        res.body[0].title.should.equal('Jaws');
        done();
      });
  });

  it('should list a SINGLE movie on /movies/:id GET', function(done){
    Movie.find({title: "Jaws"})
    .then((jaws)=> {
      chai.request(app)
        .get(`/movies/${jaws[0].id}`)
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('title');
          res.body.title.should.equal('Jaws');
          res.body.should.have.property('year');
          res.body.year.should.equal(1970);        
          done();
        });      
    })
  });

  it('should add a SINGLE movie on /movies POST', function(done){
    chai.request(app)
      .post('/movies')
      .send({
        title: 'Gallipolli',
        year: 1990
      })
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('title');
        res.body.title.should.equal('Gallipolli');
        res.body.should.have.property('year');
        res.body.year.should.equal(1990);        
        done();
      });
  });

  it('should update a SINGLE movie on /movies/:id PUT', function(done){
    Movie.find({title: "Jaws"})
    .then((jaws)=> {
      chai.request(app)
        .put(`/movies/${jaws[0].id}`)
        .send({
          title: 'Jaws 2'
        })
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('title');
          res.body.title.should.equal('Jaws 2');
          res.body.should.have.property('year');
          res.body.year.should.equal(1970);        
          done();
        });      
    })
  });

  it('should delete a SINGLE movie on /movies/:id DELETE', function(done){
    Movie.find({title: "Alien"})
    .then((alien)=> {
      chai.request(app)
        .delete(`/movies/${alien[0].id}`)
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('title');
          res.body.title.should.equal('Alien');
          res.body.should.have.property('year');
          res.body.year.should.equal(1970);        
          chai.request(app)
            .get('/movies')
            .end(function(err, res){
              res.body.should.have.length(3)
              done();
            });
        });      
    })
  });

});

