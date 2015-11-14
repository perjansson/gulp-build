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
  ngAnnotate = require('gulp-ng-annotate'),
  templateCache = require('gulp-angular-templatecache'),
  minifyHTML = require('gulp-minify-html'),
  rev = require('gulp-rev'),
  del = require('del'),
  runSequence = require('run-sequence');

var scripts = 'app/scripts/**/*.js';
var styles = 'app/styles/**/*.css';
var dist = './dist/';
var dist_scripts = 'scripts.min.js';
var dist_vendor_scripts = 'vendor.min.js';
var dist_styles = 'styles.min.css';
var dist_vendor_styles = 'vendor.min.css';

gulp.task('clean', function () {
  return del([dist]);
});

gulp.task('templatecache', function() {
  return gulp.src('app/partials/**/*.html')
    .pipe(minifyHTML({
      quotes: true,
      conditionals: true,
      spare: true
    }))
    .pipe(templateCache('templates.js', {
      module: 'gulpBuildApp',
      root: 'app/partials/',
      standAlone: false
    }))
    .pipe(gulp.dest('app/scripts/templates/'));
});

gulp.task('build-scripts', ['templatecache'], function() {
  return gulp.src(scripts)
    .pipe(sourcemaps.init())
    .pipe(concat(dist_scripts))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(rev())
    .pipe(gulp.dest(dist))
    .pipe(rev.manifest())
    .pipe(rename('rev-manifest-scripts.json'))
    .pipe(gulp.dest(dist));
});

gulp.task('build-styles', function() {
  return gulp.src(styles)
    .pipe(sourcemaps.init())
    .pipe(concat(dist_styles))
    .pipe(minifyCSS())
    .pipe(sourcemaps.write())
    .pipe(rev())
    .pipe(gulp.dest(dist))
    .pipe(rev.manifest())
    .pipe(rename('rev-manifest-styles.json'))
    .pipe(gulp.dest(dist));
});

gulp.task('build-vendor-scripts', function() {
  return gulp.src(bower())
    .pipe(filter('**/*.js'))
    .pipe(concat(dist_vendor_scripts))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest(dist))
    .pipe(rev.manifest())
    .pipe(rename('rev-manifest-vendor-scripts.json'))
    .pipe(gulp.dest(dist));
});

gulp.task('build-vendor-styles', function() {
  return gulp.src(bower())
    .pipe(filter('**/*.css'))
    .pipe(concat(dist_vendor_styles))
    .pipe(minifyCSS())
    .pipe(rev())
    .pipe(gulp.dest(dist))
    .pipe(rev.manifest())
    .pipe(rename('rev-manifest-vendor-styles.json'))
    .pipe(gulp.dest(dist));
});

gulp.task('build', runSequence('clean', ['build-scripts', 'build-styles', 'build-vendor-scripts', 'build-vendor-styles'], function() {
  var manifest_scripts = require('./dist/rev-manifest-scripts.json');
  var manifest_styles = require('./dist/rev-manifest-styles.json');
  var manifest_vendor_scripts = require('./dist/rev-manifest-vendor-scripts.json');
  var manifest_vendor_styles = require('./dist/rev-manifest-vendor-styles.json');

  return gulp.src('index.html')
    .pipe(inject(
      gulp.src([dist + manifest_vendor_scripts[dist_vendor_scripts], dist + manifest_vendor_styles[dist_vendor_styles]], {
        read: false
      }), {
        name: 'bower',
        relative: true
      }))
    .pipe(inject(
      gulp.src(dist + manifest_scripts[dist_scripts], {
        read: false
      }), {
        relative: true
      }))
    .pipe(inject(
      gulp.src(dist + manifest_styles[dist_styles], {
        read: false
      }), {
        relative: true
      }))
    .pipe(gulp.dest('./'))
}));

gulp.task('connect', function() {
  connect.server();
});

gulp.task('default', ['build', 'connect']);
