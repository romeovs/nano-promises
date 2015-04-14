// set up chai
import chai from 'chai';
import cas  from 'chai-as-promised';

chai.use(cas);

// set up db
import nano from 'nano';
import prom from '../src';

var url    = 'http://localhost:5984/';
var dbName = 'test';

var couch = prom(nano(url));
var db    = couch.db.use('test');

var reset = function(done) {
  couch.db.destroy(dbName)
    .then(function(res) {
      // db was deleted
      return couch.db.create(dbName);
    }, function(err) {
      // db wasn't there in the first place
      return couch.db.create(dbName);
    })
    .then(function(res) {
      done();
    })
    .catch(function(err) {
      done(err);
    });
};


export default {
  expect: chai.expect
, db
, reset
};

