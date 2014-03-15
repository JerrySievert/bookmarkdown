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

  return {
    "title":    book.title,
    "author":   book.author,
    "toc":      chapters.toc,
    "chapters": chapters.chapters
  };
}

function readChapters (path, input) {
  var toc = [ ];
  var chapters = [ ];

  for (var i = 0; i < input.length; i++) {
    var file = fs.readFileSync(path + "/" + input[i], 'utf8');
    var chapter = parser.parseImport(file, 'chapter');

    var title = chapter.meta.title ? chapter.meta.title : "Empty Title";

    toc.push({ title: title });
    chapters.push(chapter);
  }

  return {
    toc: toc,
    chapters: chapters
  };
}


exports.readBook = readBook;