var gulp = require('gulp'),
  connect = require('gulp-connect'),
  bower = require('main-bower-files'),
  inject = require('gulp-inject'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  minifyCSS = require('gulp-minify-css');

var scripts = 'app/scripts/**/*.js';
var styles = 'app/styles/**/*.css';
var dist = './dist/';
var dist_scripts = 'scripts.min.js';
var dist_styles = 'styles.min.css';

gulp.task('scripts', function() {
  return gulp.src(scripts)
    .pipe(uglify())
    .pipe(concat(dist_scripts))
    .pipe(gulp.dest(dist));
});

gulp.task('styles', function() {
  return gulp.src(styles)
    .pipe(minifyCSS())
    .pipe(concat(dist_styles))
    .pipe(gulp.dest(dist));
});

gulp.task('build', ['scripts', 'styles'], function() {
  return gulp.src('index.html')
    .pipe(inject(
      gulp.src(bower(), {
        read: false
      }), {
        name: 'bower',
        relative: true
      }))
    .pipe(inject(
      gulp.src(dist + dist_scripts, {
        read: false
      }), {
        relative: true
      }))
    .pipe(inject(
      gulp.src(dist + dist_styles, {
        read: false
      }), {
        relative: true
      }))
    .pipe(gulp.dest('./'));
});

gulp.task('connect', function() {
  connect.server();
});

gulp.task('default', ['build', 'connect']);
