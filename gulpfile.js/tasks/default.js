var gulp = require('gulp');
var runSequence = require('run-sequence');

var defaultTask = function() {
  runSequence(
    ['html', 'css', 'scripts'],
    ['fonts', 'images', 'svgSprite', 'static'],
    'watch'
  );
};

gulp.task('default', defaultTask);
