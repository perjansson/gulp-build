var gulp = require('gulp'),
  del = require('del'),
  config = require('../gulp.config')();

gulp.task('clean', function() {
  return del([config.dist]);
});
