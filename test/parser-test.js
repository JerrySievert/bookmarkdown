var vows   = require('vows'),
    assert = require('assert'),
    fs     = require('fs');

var parser = require('../lib/parser');

vows.describe('Parser').addBatch({
  'When a book.json is read': {
    topic: function ( ) {
      var book = fs.readFileSync(__dirname + '/input/book.json', 'utf8');

      return book;
    },
    'the book can be parsed': {
      topic: function (book) {
        return parser.parseBook(book);
      },
      'and the title is set': function (topic) {
        assert.equal(topic.title, "A Book");
      },
      'and the author is correct': function (topic) {
        assert.equal(topic.author.firstname, "Some");
        assert.equal(topic.author.lastname, "Person");
      }
    }
  },
  'When a chapter is read': {
    topic: function ( ) {
      var chapter = fs.readFileSync(__dirname + '/input/chapter/chap1.bmd', 'utf8');

      return chapter;
    },
    'the chapter can be parsed': {
      topic: function (chapter) {
        return parser.parseImport(chapter, 'chapter');
      },
      'and the title is set': function (topic) {
        assert.equal(topic.meta.title, "Chapter 1");
      },
      'and the text is correct': function (topic) {
        assert.equal(topic.text, "In the beginning, there was the book.");
      }
    }
  }
}).export(module);