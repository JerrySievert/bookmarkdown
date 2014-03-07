var fs     = require('fs'),
    parser = require(__basedir + '/lib/parser'),
    path   = require('path');

function readBook (filename) {
  var book;
  try {
    var bookJson = fs.readFileSync(filename);
    book = parser.parseBook(bookJson);
  } catch (err) {
    throw err;
  }

  var chapters = readChapters(path.dirname(filename) + "/" + book.chapters);

  return {
    "title":    book.title,
    "author":   book.author,
    "toc":      toc,
    "chapters": chapters
  };
}

function readChapters (input) {
  var file = fs.readFileSync(input, 'utf8');
  var toc = [ ];
  var chapters = [ ];

  for (var i = 0; i < input.length; i++) {
    var chapter = parser.parseImport(chapters[i], 'chapter');

    toc.push(chapter.title);
    chapters.push(chapter);
  }

  return {
    toc: toc,
    chapters: chapters
  };
}


exports.readBook = readBook;