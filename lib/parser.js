var log = require('./log.js');

function parseImport (input, type) {
  var parts = input.split(/%%%[\n]*/);

  if (parts.length === 0) {
    log.error("You appear to have an empty chapter");
    return;
  }

  // no json? no problem
  if (parts.length === 1) {
    return {
      meta: { },
      text: parts[0]
    };
  }

  if (type === "chapter") {
    return {
      meta: parseChapter(parts[1]),
      text: parts[2]
    };
  }
}

function parseChapter (input) {
  return JSON.parse(input);
}

function parseBook (input) {
  return JSON.parse(input);
}

exports.parseImport = parseImport;
exports.parseBook = parseBook;
