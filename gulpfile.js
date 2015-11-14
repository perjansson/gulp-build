var gulp = require('gulp'),
  connect = require('gulp-connect'),
  bower = require('main-bower-files'),
  inject = require('gulp-inject');

var scripts = 'app/scripts/**/*.js';
var styles = 'app/styles/**/*.css';

gulp.task('build', function() {
  return gulp.src('index.html')
    .pipe(inject(
      gulp.src(bower(), {
        read: false
      }), {
        name: 'bower',
        relative: true
      }))
    .pipe(inject(
      gulp.src(scripts, {
        read: false
      }), {
        relative: true
      }))
    .pipe(inject(
      gulp.src(styles, {
        read: false
      }), {
        relative: true
      }))
    .pipe(gulp.dest('./'));
});

gulp.task('connect', function() {
  connect.server();
});

gulp.task('default', ['connect']);
