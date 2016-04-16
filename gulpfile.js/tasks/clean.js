var gulp   = require('gulp');
var del    = require('del');
var config = require('../config');

var cleanTask = function() {
  return del(config.root.dest);
};

gulp.task('clean', cleanTask);
