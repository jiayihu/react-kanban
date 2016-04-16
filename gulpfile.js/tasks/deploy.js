var config      = require('../config');
var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');

var deployTask = function() {
  return gulp.src(config.root.dest + '/**/*')
    .pipe(ghPages(config.tasks.deploy));
};

gulp.task('deploy', deployTask);
