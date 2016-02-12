var config = require('../config.json');
var gulp = require('gulp');
var path = require('path');

var watchTask = function() {
  var watchableTasks = ['css', 'html','images','fonts'];

  watchableTasks.forEach(function(taskName) {
    var task = config.tasks[taskName];
    if(task) {
      var glob = [];
      task.extensions.forEach(function(extension) {
        glob.push( path.join(config.root.src, task.src, '**/*.' + extension) );
      });
      gulp.watch(glob, [taskName]);
    }
  });
};

gulp.task('watch', ['browserSync'], watchTask);
