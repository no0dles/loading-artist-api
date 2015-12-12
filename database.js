var Promise = require('bluebird');
var mysql = require('mysql');
var fs = require("fs");

function DB() {
  this.pool = null;
}

DB.prototype.configure = function (config) {
  this.pool = mysql.createPool(config);
};

DB.prototype.init = function () {
  var table_script = fs.readFileSync("scripts/create_table.sql", "utf8");

  this.query(table_script).then(function (result) {
    if(result[0].affectedRows > 0) {
      console.log('created table');
    }
  }).catch(function (err) {
    console.error(err);
  });
};

DB.prototype.connection = function () {
  var defer = Promise.defer();

  var connection;

  this.pool.getConnection(function (err, con) {
    if (err) {
      if (con) {
        con.release();
      }
      return defer.reject(err);
    }
    connection = con;
    defer.resolve(con);
  });

  return defer.promise;
};

DB.prototype.escape = function (query, conditions) {
  return query.replace(/\?\?/g, function (txt) {
    if ((typeof conditions) !== 'object') {
      throw new Error("Can only escape objects");
    }
    var rtn = [],
      key = '',
      cnt = 0;

    for (key in conditions) {
      var value = mysql.escape(conditions[key].value);

      if (!conditions.hasOwnProperty(key) || value == 'NULL') {
        continue;
      }

      cnt += 1;
      rtn.push(mysql.escapeId(conditions[key].column) + conditions[key].operator + value);
    }

    if (cnt === 0) {
      return '1';
    }
    return rtn.join(' AND ');
  });
};

DB.prototype.query = function (query, params) {
  var defer = Promise.defer();

  this.connection()
    .then(function (con) {
      con.query(query, params, function (err) {
        if (err) {
          if (con) {
            con.release();
          }
          return defer.reject(err);
        }
        defer.resolve([].splice.call(arguments, 1));
        con.release();
      });
    });

  return defer.promise;
};

DB.prototype.end = function () {
  var defer = Promise.defer();

  this.pool.end(function (err) {
    if (err) {
      return defer.reject(err);
    }

    defer.resolve();
  });
  return defer.promise;
};

module.exports = new DB();