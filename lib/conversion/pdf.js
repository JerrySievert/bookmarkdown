var pdfkit = require('pdfkit');
var fs = require('fs');


function buildDocument (input, config, output) {
  var doc = new pdfkit();

  doc.pipe(output);

  buildTitle(doc, input, config);
  return doc;
}

function buildTitle(doc, input, config) {
  
}

doc.pipe(fs.createWriteStream('output.pdf'));

doc.addPage()
   .fontSize(25)
   .text(lorem, 100, 100);

doc.end();
