'use strict';

import path from 'path';
import { spawn } from 'child_process';

var backgroundJS = path.resolve(__dirname, '/background.js');
var childs = [];
var noop = function () {};

function start (options, callback) {
  var child;

  if (typeof(callback) !== 'function') callback = noop;

  options = JSON.stringify(options || {});

  // node background.js '{ ... }'
  child = spawn('node', [backgroundJS, `'${ options }'`], { stdio: 'inherit' });

  // exit automatically when singleRun is true
  child.on('exit', (code) => {
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
    childs[index] = false;
  }
}

export default {
    start: start
  , kill: kill
  , __childs: childs
}
