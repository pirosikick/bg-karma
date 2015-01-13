# bg-karma

Run karma in background

## Usage

With gulp task:

```javascript
var gulp = require('gulp');
var util = require('gulp-util');
var karma = require('bg-karma');

gulp.task('test', function (done) {
  function doneKarma (code) {
    // karma exit with error.
    if (code) {
      util.log('karma exit with code.[code=' +code+ ']');
      process.exit(1);
    }

    done();
  }

  karma.start({
    configFile:  'karma.conf.js'
  , singleRun: true
  }, doneKarma);
});
```

## Why need this?

There's no way to detect the end of running test task when using `require('karma').server.start`.
## Lincense

[MIT](http://pirosikick.mit-license.org/)

