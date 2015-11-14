var gulp = require('gulp'),
  connect = require('gulp-connect'),
  bower = require('main-bower-files'),
  inject = require('gulp-inject'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  minifyCSS = require('gulp-minify-css'),
  filter = require('gulp-filter'),
  sourcemaps = require('gulp-sourcemaps'),
  ngAnnotate = require('gulp-ng-annotate');

var scripts = 'app/scripts/**/*.js';
var styles = 'app/styles/**/*.css';
var dist = './dist/';
var dist_scripts = 'scripts.min.js';
var dist_vendor_scripts = 'vendor.min.js';
var dist_styles = 'styles.min.css';
var dist_vendor_styles = 'vendor.min.css';

gulp.task('scripts', function() {
  return gulp.src(scripts)
    .pipe(sourcemaps.init())
    //.pipe(uglify())
    .pipe(concat(dist_scripts))
    .pipe(ngAnnotate())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dist));
});

gulp.task('vendor_scripts', function() {
  return gulp.src(bower())
    .pipe(filter('**/*.js'))
    //.pipe(uglify())
    .pipe(concat(dist_vendor_scripts))
    .pipe(ngAnnotate())
    .pipe(gulp.dest(dist));
});

gulp.task('styles', function() {
  return gulp.src(styles)
    .pipe(sourcemaps.init())
    .pipe(minifyCSS())
    .pipe(concat(dist_styles))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dist));
});

gulp.task('vendor_styles', function() {
  return gulp.src(bower())
    .pipe(filter('**/*.css'))
    .pipe(minifyCSS())
    .pipe(concat(dist_vendor_styles))
    .pipe(gulp.dest(dist));
});

gulp.task('build', ['scripts', 'vendor_scripts', 'styles', 'vendor_styles'], function() {
  return gulp.src('index.html')
    .pipe(inject(
      gulp.src([dist + dist_vendor_scripts, dist + dist_vendor_styles], {
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
