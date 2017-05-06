//var exec = require('child_process').exec;
var execSync = require('child_process').execSync;
var path = require('path');

const regexp = /\/\/www.targetf.com\//;

function parseTarget(url) {
  var parserScriptFile = path.join(__dirname, '/', 'parser.js');
  var cmd = `phantomjs ${ parserScriptFile } "${ url }"`;

  var resp = execSync(cmd);
  var stdioResponseString = Buffer.from(resp).toString();
  return stdioResponseString;
};


module.exports.parse  = parseTarget;
module.exports.regexp = regexp;
