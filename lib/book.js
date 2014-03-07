var fs = require('fs'),
    parser = require(__basedir + '/lib/parser');

function readBook (filename) {
  var book;
  try {
    var bookJson = fs.readFileSync(filename);
    book = parser.parseBook(bookJson);
  } catch (err) {
    throw err;
  }

  var chapters = readChapters(book.chapters);
}

function readChapters (chapters) {
  var toc = [ ];
}


exports.readBook = readBook;