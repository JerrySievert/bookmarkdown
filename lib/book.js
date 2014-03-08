var fs     = require('fs'),
    parser = require(__dirname + '/parser'),
    path   = require('path');

function readBook (filename) {
  var book;
  try {
    var bookJson = fs.readFileSync(filename);
    book = parser.parseBook(bookJson);
  } catch (err) {
    throw err;
  }

  var chapters = readChapters(path.dirname(filename), book.chapters);

  var toc = [ ];

  for (var i = 0; i < chapters.length; i++) {
    toc.concat(chapters[i].toc);
  }

  return {
    "title":    book.title,
    "author":   book.author,
    "toc":      toc,
    "chapters": chapters.chapters
  };
}

function readChapters (path, input) {
  var toc = [ ];
  var chapters = [ ];

  for (var i = 0; i < input.length; i++) {
    var file = fs.readFileSync(path + "/" + input[i], 'utf8');
    var chapter = parser.parseImport(file, 'chapter');

    toc.push(chapter.title);
    chapters.push(chapter);
  }

  return {
    toc: toc,
    chapters: chapters
  };
}


exports.readBook = readBook;