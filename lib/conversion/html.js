var fs         = require('fs'),
    marked     = require('marked'),
    Handlebars = require('handlebars');

var chapter = fs.readFileSync(__dirname + '/../../templates/chapter.hb', 'utf8');
var toc = fs.readFileSync(__dirname + '/../../templates/toc.hb', 'utf8');
var index = fs.readFileSync(__dirname + '/../../templates/index.hb', 'utf8');

Handlebars.registerHelper('toc', function(context, options) {
  var ret = "<ul>";

  for(var i=0, j=context.length; i<j; i++) {
    ret = ret + "<li>" + i + "." + options.fn(context[i]) + "</li>";
  }

  return ret + "</ul>";
});

Handlebars.registerHelper('each', function(items, options) {
  var out = '';
  for(var i=0, l=items.length; i<l; i++) {
    out = out + options.fn(items[i]);
  }

  return out;
});

var tocTemplate = Handlebars.compile(toc);
var chapterTemplate = Handlebars.compile(chapter);
var indexTemplate = Handlebars.compile(index);

function buildTOC (input) {
  return tocTemplate(input);
}

function buildChapter (input) {
  return chapterTemplate(input);
}

function buildIndex (input) {
  return indexTemplate(input);
}

exports.buildTOC = buildTOC;
exports.buildChapter = buildChapter;
exports.buildIndex = buildIndex;