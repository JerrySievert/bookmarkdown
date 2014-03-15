var vows   = require('vows'),
    assert = require('assert'),
    fs     = require('fs');

var book = require('../lib/book');

vows.describe('Book').addBatch({
  'When a book is read': {
    topic: function ( ) {
      var results = book.readBook(__dirname + '/input/book.json');

      return results;
    },
    'the title should be correct': function (topic) {
      assert.equal(topic.title, "A Book");
    },
    'the author should be correct': function (topic) {
      assert.equal(topic.author.firstname, "Some");
      assert.equal(topic.author.lastname, "Person");
    },
    'there should be two chapters': function (topic) {
      assert.equal(topic.chapters.length, 2);
    },
    'there should be two entries in the toc': function (topic) {
      assert.equal(topic.toc.length, 2);
    },
    'the first entry of the toc should be correct': function (topic) {
      assert.equal(topic.toc[0].title, 'Chapter 1');
    },
    'the second entry of the toc should be correct': function (topic) {
      assert.equal(topic.toc[1].title, 'Chapter 2');
    }
  }
}).export(module);