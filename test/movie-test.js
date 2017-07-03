var chai = require('chai');
var expect = chai.expect;
let sinon = require('sinon');

let Movie = require('../models/movie');
let movies = require('../routes/movies');

describe('#Movie', function(){
  describe('.find', function(){
    it('should exist', function(){
      expect(Movie.find).to.be.ok;
    })

    it('should return all movies', function(done){
      // Trivial example of overriding Movie.find to return a promise
      // This test is useless, but gives an example of how sinon stub works. Note that we restore the original function
      let original = Movie.find;
      Movie.find = function(){
        return Promise.resolve('banana');
      }

      Movie.find().then(data =>{
        expect(data).to.equal('banana');
      }).then(done,done);

      // Restore original
      Movie.find = original
    })
  })
});

describe('movies', function(){
  describe('index', function(){
    it('should exist', function(){
      expect(movies.index).to.be.ok;
    });

    // Unit testing a route
    it('should call Movie.find', function(){
      // Define simple req and res variables for unit testing, these won't do anything except allow us to call our function
      var req = {};
      var res = {
        data: {},
        send: function(data){
          this.data = data;
        }
      };
      // Let's use sinon.stub which replaces the Movie.find function with our fake promise function
      // Benefit of using our own custom stub as per above is that will allow us to spy on it and detect if it has been called
      // Note that our movies.index callback function doesn't return anything, it merely calls the Movie.find function
      // Hence we are testing that it calls the mongoose Movie.find function
      let movieStub = sinon.stub(Movie, 'find').callsFake(function(){
        return Promise.resolve('banana')
      });

      movies.index(req, res);
      sinon.assert.calledOnce(movieStub);

      // Remember to restore the stub back to its original
      movieStub.restore();
    })

  })
});

// var should = require("should")
//     , routes = require("../routes");

// var request = {};
// var response = {
//     viewName: ""
//     , data : {}
//     , render: function(view, viewData) {
//         viewName = view;
//         data = viewData;
//     }
// };

// describe("Routing", function(){
//     describe("Default Route", function(){
//         it("should provide the a title and the index view name", function(){
//         routes.index(request, response);
//         response.viewName.should.equal("index");
//         });

//     });
// });
