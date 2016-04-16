var config      = require('../config');

var browserSync = require('browser-sync');
var gulp        = require('gulp');
var imagemin    = require('gulp-imagemin');
var svgstore    = require('gulp-svgstore');
var path        = require('path');

var svgSpriteTask = function() {

  var settings = {
    src: path.join(config.root.src, config.tasks.svgSprite.src, '/*.svg'),
    dest: path.join(config.root.dest, config.tasks.svgSprite.dest)
  };

  return gulp.src(settings.src)
    .pipe(imagemin())
    .pipe(svgstore())
    .pipe(gulp.dest(settings.dest))
    .pipe(browserSync.stream());
};

gulp.task('svgSprite', svgSpriteTask);
