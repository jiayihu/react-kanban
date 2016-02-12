var config = require('../config');
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

var serverTask = function() {
  nodemon({
    script: config.tasks.server.app,
    ext: 'js',
    env: { 'NODE_ENV': 'development' }
  });
};

gulp.task('server', serverTask);
