var gulp   = require('gulp');
var del    = require('del');
var config = require('../config');

var cleanTask = function() {
  del(config.root.dest);
};

gulp.task('clean', cleanTask);
