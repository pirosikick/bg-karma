'use strict';

import { server as karma } from 'karma'

var options = JSON.parse(argv[2]) || {};

karma.start(options);
