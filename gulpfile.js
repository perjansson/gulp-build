var gulp = require('gulp'),
  requireDir = require('require-dir');

requireDir('./gulp_tasks');

gulp.task('default', ['build', 'connect']);
