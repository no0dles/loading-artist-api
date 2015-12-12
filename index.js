var server = require('./server');

var port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('%s listening at %s', server.name, server.url);
});