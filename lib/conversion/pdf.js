var pdfkit = require('pdfkit');
var fs = require('fs');


function buildPage (input, config, output) {
  var doc = new pdfkit();

  doc.pipe(output);
  return doc;
}

doc.pipe(fs.createWriteStream('output.pdf'));

doc.addPage()
   .fontSize(25)
   .text(lorem, 100, 100);

doc.end();
