var should = require('chai').should();
var hippie = require('hippie');
var server = require('../server');
var helper = require('./helper');

describe('update', function () {
  beforeEach(function() {
    return helper.clearDatabase();
  });

  it('get latest id', function (done) {
    helper.createComic({
      url: 'http://url',
      img_url: 'http://img',
      thumb_url: 'http://thumb',
      title: 'test comic',
      author: 'test',
      date: new Date()
    }).then(function (comic) {

      hippie(server)
        .json()
        .get('/update')
        .expectStatus(200)
        .end(function(err, res, body) {
          if (err) throw err;

          body.should.have.property('last_id');
          body.last_id.should.equal(comic.id);

          done();
        });
    });

  })
});