var restify = require('restify');
var config = require('config');
var db = require('./database');

db.configure(config.get('db'));

var server = restify.createServer({
  name: 'loading-artist-server',
  version: '1.0.0'
});

var port = process.env.PORT || 3000;

server.use(restify.queryParser());
server.use(
  function crossOrigin(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
  }
);

server.get('/update', function (req, res, next) {
  return db.query('select max(last_update) last_update, max(id) last_id from comics')
    .then(function (rows) {
      res.send(200, rows[0]);
      return next();
    })
    .catch(function (err) {
      return next(err);
    });
});

server.get('/fetch', function (req, res, next) {

  var sql = db.escape('select * from comics where ??', [
    { column: 'last_update', operator: '>', value: req.params.lastUpdate },
    { column: 'id', operator: '>', value: req.params.lastId }
  ]);

  sql += ' order by last_update, id';

  return db.query(count(sql))
    .then(function (cnt) {
      return db.query(pagination(sql, config.get('pageLimit'), req.params.page))
        .then(function (comics) {
          res.send(200, {
            'page': parsePage(req.params.page),
            'total_pages': Math.ceil(cnt[0][0]['count'] / config.get('pageLimit')),
            'comics': comics[0]
          });

          return next();
        });
    })
    .catch(function (err) {
      return next(err);
    });
});

function parsePage(page) {
  return parseInt(page) || 1;
}

function pagination(sql, limit, page) {
  return sql + ' limit ' + limit + ' offset ' + (parsePage(page)-1) * config.get('pageLimit');
}

function count(sql) {
  return 'select count(*) count from (' + sql + ') cnt';
}

server.listen(port, function () {
  console.log('%s listening at %s', server.name, server.url);
});