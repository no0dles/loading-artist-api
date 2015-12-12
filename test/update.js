var hippie = require('hippie');
var server = require('../server');

describe('update', function () {
  it('get latest id', function (done) {
    hippie(server)
      .json()
      .get('/update')
      .expectStatus(200)
      .end(function(err, res, body) {
        console.log(body);
        if (err) throw err;
        done();
      });
  })
});