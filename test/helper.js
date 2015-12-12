var db = require('../database');

module.exports.clearDatabase = function () {
  return db.query('delete from comics');
};

module.exports.createComic = function (comic) {
  return db.query('insert into comics (url, img_url, thumb_url, title, author, date) values (?, ?, ?, ?, ?, ?)', [
    comic.url, comic.img_url, comic.thumb_url, comic.title, comic.author, comic.date
  ]).then(function (result) {
    comic.id = result[0].insertId;
    return comic;
  });
};