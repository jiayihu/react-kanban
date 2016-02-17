var config       = require('../config');
var gulp         = require('gulp');
var gulpif       = require('gulp-if');
var browserSync  = require('browser-sync');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var path         = require('path');

var paths = {
  src: path.join(config.root.src, config.tasks.css.src, '/**/*.{' + config.tasks.css.extensions + '}'),
  dest: path.join(config.root.dest, config.tasks.css.dest)
};

var isProduction = process.env.NODE_ENV === 'production';

var cssTask = function () {
  return gulp.src(paths.src)
    .pipe(gulpif(!isProduction, sourcemaps.init()))
    .pipe(sass(config.tasks.css.sass))
    .on('error', sass.logError)
    .pipe(autoprefixer(config.tasks.css.autoprefixer))
    .pipe( gulpif(isProduction, cssnano()) )
    .pipe(gulpif(!isProduction, sourcemaps.write('./maps')))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream({match: '**/*.css'}));
};

gulp.task('css', cssTask);
