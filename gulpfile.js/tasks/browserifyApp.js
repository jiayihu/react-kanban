var config = require('../config.json');
var packageManifest = require('../../package.json');

var watchify = require('watchify');
var gulp = require('gulp');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var path = require('path');
var browserSync  = require('browser-sync');

var paths = {
  src: path.join(config.root.src, config.tasks.scripts.src, config.tasks.scripts.main),
  dest: path.join(config.root.dest, config.tasks.scripts.dest)
};

var isProduction = process.env.NODE_ENV === 'production';

var deps = Object.keys(packageManifest.dependencies); //[ 'react', 'react-dom' ]
var customOpts = {
  cache: {},
  packageCache: {},
  entries: paths.src,
  debug: isProduction? false : true,
  transform: [
    ['babelify', {presets: ['es2015', 'react']}]
  ]
};
var appBundle = browserify(customOpts);
appBundle.plugin(watchify);
appBundle.external(deps);

var buildApp = function() {

  return appBundle
    .bundle()
    .on('error', console.log)
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe( gulpif(isProduction, uglify()) )
    .on('error', console.log)
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream());
};

appBundle.on('update', buildApp);

gulp.task('scripts', buildApp);
