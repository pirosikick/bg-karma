'use strict';

import path from 'path';
import { spawn } from 'child_process';

var backgroundJS = path.resolve(__dirname, 'background.js');
console.log(__dirname, backgroundJS);
var childs = [];
var noop = function () {};

function start (options, callback) {
  var child;

  if (typeof(callback) !== 'function') callback = noop;

  options = JSON.stringify(options || {});

  // node background.js '{ ... }'
  child = spawn('node', [backgroundJS, options], { stdio: 'inherit' });

  // exit automatically when singleRun is true
  child.on('exit', (code) => {
    callback(code);
  });

  return child;
}
export {start};
