"use strict";

var spawn = require("child_process").spawn;
var backgroundJS = path.resolve(__dirname, "/background.js");

var childs = [];
var noop = function () {};

function start(options, callback) {
  var child;

  if (typeof callback !== "function") callback = noop;

  options = JSON.stringify(options || {});
  child = spawn("node", [backgroundJS, "'" + options + "'"], { stdio: "inherit" });

  // exit automatically when singleRun is true
  child.on("exit", function (code) {
    _kill(child);
    callback(code);
  });

  childs.push(child);

  return childs.length - 1;
}

function kill(index) {
  childs[index] && _kill(childs[index]);
}

function _kill(child) {
  var index = childs.indexOf(child);

  if (index !== -1) {
    child.kill();
    childs[index] = false;
  }
}

exports.start = start;
exports.kill = kill;
exports.__childs = childs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztlQVFnQixPQUFPLEVBQUUsUUFBUSxFQUFFO0FBQ2pDOztBQUVBLHFCQUFvQixLQUFLLFVBQVUsRUFBRSxRQUFRLEdBQUcsSUFBSSxDQUFDOztBQUVyRDtBQUNBLDZDQUEwQyxPQUFPLE9BQUssRUFBRSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDOzs7QUFHOUUsNkJBQWtCLElBQUksRUFBSztBQUN6QjtBQUNBOzs7QUFHRjs7QUFFQTs7O2NBR2EsS0FBSyxFQUFFO0FBQ3BCOzs7ZUFHYyxLQUFLLEVBQUU7QUFDckI7O0FBRUE7QUFDRTtBQUNBIiwiZmlsZSI6InNyYy9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIHNwYXduID0gcmVxdWlyZSgnY2hpbGRfcHJvY2VzcycpLnNwYXduO1xudmFyIGJhY2tncm91bmRKUyA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcvYmFja2dyb3VuZC5qcycpO1xuXG52YXIgY2hpbGRzID0gW107XG52YXIgbm9vcCA9IGZ1bmN0aW9uICgpIHt9O1xuXG5mdW5jdGlvbiBzdGFydCAob3B0aW9ucywgY2FsbGJhY2spIHtcbiAgdmFyIGNoaWxkO1xuXG4gIGlmICh0eXBlb2YoY2FsbGJhY2spICE9PSAnZnVuY3Rpb24nKSBjYWxsYmFjayA9IG5vb3A7XG5cbiAgb3B0aW9ucyA9IEpTT04uc3RyaW5naWZ5KG9wdGlvbnMgfHwge30pO1xuICBjaGlsZCA9IHNwYXduKCdub2RlJywgW2JhY2tncm91bmRKUywgYCckeyBvcHRpb25zIH0nYF0sIHsgc3RkaW86ICdpbmhlcml0JyB9KTtcblxuICAvLyBleGl0IGF1dG9tYXRpY2FsbHkgd2hlbiBzaW5nbGVSdW4gaXMgdHJ1ZVxuICBjaGlsZC5vbignZXhpdCcsIChjb2RlKSA9PiB7XG4gICAgX2tpbGwoY2hpbGQpO1xuICAgIGNhbGxiYWNrKGNvZGUpO1xuICB9KTtcblxuICBjaGlsZHMucHVzaChjaGlsZCk7XG5cbiAgcmV0dXJuIGNoaWxkcy5sZW5ndGggLSAxO1xufVxuXG5mdW5jdGlvbiBraWxsIChpbmRleCkge1xuICBjaGlsZHNbaW5kZXhdICYmIF9raWxsKGNoaWxkc1tpbmRleF0pO1xufVxuXG5mdW5jdGlvbiBfa2lsbCAoY2hpbGQpIHtcbiAgdmFyIGluZGV4ID0gY2hpbGRzLmluZGV4T2YoY2hpbGQpO1xuXG4gIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICBjaGlsZC5raWxsKCk7XG4gICAgY2hpbGRzW2luZGV4XSA9IGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydHMuc3RhcnQgPSBzdGFydDtcbmV4cG9ydHMua2lsbCA9IGtpbGw7XG5leHBvcnRzLl9fY2hpbGRzID0gY2hpbGRzO1xuIl19