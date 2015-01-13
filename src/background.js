'use strict';

import { server as karma } from 'karma'

var options = JSON.parse(process.argv[2]) || {};

karma.start(options);
