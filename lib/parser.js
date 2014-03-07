function parseImport (input, type) {
  var parts = input.split(/%%%[\n]*/);

  if (parts.length === 0) {
    // [todo] - should return an actual human readable error: error.js?
    throw Error("Unable to parse");
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