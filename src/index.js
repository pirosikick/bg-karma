'use strict';

var spawn = require('child_process').spawn;
var backgroundJS = path.resolve(__dirname, '/background.js');

var childs = [];

function start (configFile, options, callback) {

  if (typeof(options) === 'function') {
    callback = options;
    options = {};
  }

  options = options || {};
  options.configFile = configFile;

  var data = "'" + JSON.stringify(options) + "'";
  var child = spawn('node', [backgroundJS, data], { stdio: 'inherit' });

  // exit automatically when singleRun is true
  child.on('exit', function (code) {
    _kill(child);
    callback(code);
  });

  childs.push(child);

  return childs.length - 1;
}

function kill (index) {
  childs[index] && _kill(childs[index]);
}

function _kill (child) {
  var index = childs.indexOf(child);

  if (index !== -1) {
    child.kill();
    childs[index] = false:
  }
}

exports.start = start;
exports.kill = kill;