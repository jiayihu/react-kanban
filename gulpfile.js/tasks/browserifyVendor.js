var config = require('../config.json');
var packageManifest = require('../../package.json');

var gulp = require('gulp');
var browserify = require('browserify');
var envify = require('envify');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var path = require('path');
var nodeResolve = require('resolve');

var paths = {
  src: path.join(config.root.src, config.tasks.scripts.src, config.tasks.scripts.main),
  dest: path.join(config.root.dest, config.tasks.scripts.dest)
};


var getDependencies = function() {
  return Object.keys(packageManifest.dependencies);
};

var buildVendor = function() {
  var vendorBundle = browserify({
    debug: false
  });

  getDependencies().forEach(function(dep) {
    vendorBundle.require( nodeResolve.sync(dep), {expose: dep} );
  });

  return vendorBundle.bundle()
    .on('error', console.log)
    .pipe(envify())
    .pipe(source('vendor.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(paths.dest));
};

gulp.task('vendorScripts', buildVendor);
