var vows   = require('vows'),
    assert = require('assert'),
    fs     = require('fs');

var book = require('../lib/book'),
    html = require('../lib/conversion/html');

var bookEntry = book.readBook(__dirname + '/input/book.json');

vows.describe('HTML').addBatch({
  'When a TOC is rendered': {
    topic: function ( ) {
      var results = html.buildTOC(bookEntry);
      return results;
    },
    'the html should be correct': function (topic) {
      var expected = "<div class=\"toc\">\n  <ul><li>0. <a href=\"#Chapter_1\">Chapter 1</a></li><li>1. <a href=\"#Chapter_2\">Chapter 2</a></li></ul>\n</div>";
      assert.equal(topic, expected);
    }
  },
  'When a chapter is rendered': {
    topic: function ( ) {
      var results = html.buildChapter(bookEntry.chapters[0]);
      return results;
    },
    'the html should be correct': function (topic) {
      var expected = "<div class=\"chapter\">\n  <a link=\"Chapter_1\"></a>\n  <h2 class=\"chapter-title\">Chapter 1</h2>\n  <div class=\"chapter-text\">\n    In the beginning, there was the book.\n  </div>\n</div>";
      assert.equal(topic, expected);
    }
  }
}).export(module);
