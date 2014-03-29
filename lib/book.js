var fs     = require('fs'),
    parser = require(__dirname + '/parser'),
    path   = require('path');

var log = require('./log.js');

function readBook (filename, config) {
  config = config || { };
  var book;
  try {
    var bookJson = fs.readFileSync(filename);
    book = parser.parseBook(bookJson);
  } catch (err) {
    log.error("Unable to parse " + filename);
    return;
}

  var chapters = readChapters(path.dirname(filename), book, config);

  return {
    "title":    book.title,
    "author":   book.author,
    "toc":      chapters.toc,
    "chapters": chapters.chapters
  };
}

function readChapters (path, input, config) {
  var toc = [ ];
  var chapters = [ ];
  var file, title;
  var data = { };

  if (input.preface) {
    file = fs.readFileSync(path + "/" + input.preface, 'utf8');

    var preface = parser.parseImport(file, 'chapter');
    title = preface.meta.title ? preface.meta.title : "Preface";

    data.type = 'preface';
    data.title = title;

    toc.push(data);
  }

  for (var i = 0; i < input.chapters.length; i++) {
    data = { };

    file = fs.readFileSync(path + "/" + input.chapters[i], 'utf8');

    var chapter = parser.parseImport(file, 'chapter');

    title = chapter.meta.title ? chapter.meta.title : "Empty Title";
    data.title = title;

    if (config["no chapter numbers"]) {
      data.numbers = false;
    }

    chapters.push(chapter);
    toc.push(data);
  }

  return {
    toc: toc,
    preface: preface,
    chapters: chapters
  };
}


exports.readBook = readBook;
