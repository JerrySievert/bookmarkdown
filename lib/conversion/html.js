var fs         = require('fs'),
    marked     = require('marked'),
    Handlebars = require('handlebars');

var chapter = fs.readFileSync(__dirname + '/../../templates/chapter.hb', 'utf8');
var toc = fs.readFileSync(__dirname + '/../../templates/toc.hb', 'utf8');
var index = fs.readFileSync(__dirname + '/../../templates/index.hb', 'utf8');

Handlebars.registerHelper('toc', function(context, options) {
  var ret = "<ul>";

  var count = 1;
  for (var i = 0; i < context.length; i++) {
    if (context[i].type === 'preface' || context[i].numbers === false) {
      ret = ret + "<li>" + options.fn(context[i]) + "</li>";
    } else {
      ret = ret + "<li>" + (count++) + ". " + options.fn(context[i]) + "</li>";
    }
  }

  return ret + "</ul>";
});

Handlebars.registerHelper('each', function(items, options) {
  var out = '';
  for (var i = 0; i < items.length; i++) {
    out = out + options.fn(items[i]);
  }

  return out;
});

var tocTemplate = Handlebars.compile(toc);
var chapterTemplate = Handlebars.compile(chapter);
var indexTemplate = Handlebars.compile(index);

function buildTOC (input, config) {
  for (var i = 0; i < input.toc.length; i++) {
    input.toc[i].title_href = input.toc[i].title.toLowerCase().replace(/[^\w]+/g, '-');
  }

  input.config = config;

  return tocTemplate(input);
}

function buildChapter (input, config) {
  input.meta.title_href = input.meta.title.toLowerCase().replace(/[^\w]+/g, '-');
  input.text = marked(input.text);

  input.config = config;

  return chapterTemplate(input);
}

function buildIndex (input, config) {
  input.config = config;

  return indexTemplate(input);
}

exports.buildTOC = buildTOC;
exports.buildChapter = buildChapter;
exports.buildIndex = buildIndex;
