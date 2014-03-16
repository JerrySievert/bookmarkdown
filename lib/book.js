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

  var chapters = readChapters(path.dirname(filename), book);

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
  var file, title;
  var preface;

  if (input.preface) {
    file = fs.readFileSync(path + "/" + input.preface, 'utf8');
    preface = parser.parseImport(file, 'chapter');
    title = preface.meta.title ? preface.meta.title : "Preface";

    toc.push({ title: title, type: 'preface' });
  }

  for (var i = 0; i < input.chapters.length; i++) {
    file = fs.readFileSync(path + "/" + input.chapters[i], 'utf8');
    var chapter = parser.parseImport(file, 'chapter');

    title = chapter.meta.title ? chapter.meta.title : "Empty Title";

    toc.push({ title: title });
    chapters.push(chapter);
  }

  return {
    toc: toc,
    preface: preface,
    chapters: chapters
  };
}


exports.readBook = readBook;