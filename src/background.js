var karma = require('karma').server;
var options = JSON.parse(argv[2]) || {};

karma.start(options);
