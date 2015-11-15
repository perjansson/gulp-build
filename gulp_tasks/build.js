var gulp = require('gulp'),
  bower = require('main-bower-files'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  minifyCSS = require('gulp-minify-css'),
  filter = require('gulp-filter'),
  gulpif = require('gulp-if'),
  path = require('path'),
  sourcemaps = require('gulp-sourcemaps'),
  ngAnnotate = require('gulp-ng-annotate'),
  rev = require('gulp-rev'),
  runSequence = require('run-sequence'),
  config = require('../gulp.config')();

gulp.task('build', function() {
  runSequence('clean', ['build-scripts', 'build-styles', 'build-vendor-scripts', 'build-vendor-styles'], 'inject');
});

gulp.task('build-scripts', ['templatecache'], function() {
  return gulp.src(config.scripts)
    .pipe(sourcemaps.init())
    .pipe(concat(config.dist_scripts))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulpif(!config.production, sourcemaps.write('/')))
    .pipe(rev())
    .pipe(gulp.dest(config.dist))
    .pipe(rev.manifest())
    .pipe(rename(config.rev_manifest_scripts))
    .pipe(gulp.dest(config.dist));
});

gulp.task('build-styles', function() {
  return gulp.src(config.styles)
    .pipe(sourcemaps.init())
    .pipe(concat(config.dist_styles))
    .pipe(minifyCSS())
    .pipe(gulpif(!config.production, sourcemaps.write('/')))
    .pipe(rev())
    .pipe(gulp.dest(config.dist))
    .pipe(rev.manifest())
    .pipe(rename(config.rev_manifest_styles))
    .pipe(gulp.dest(config.dist));
});

gulp.task('build-vendor-scripts', function() {
  return gulp.src(bower())
    .pipe(filter('**/*.js'))
    .pipe(concat(config.dist_vendor_scripts))
    .pipe(ngAnnotate())
    .pipe(gulpif(isNotMinified, uglify()))
    .pipe(rev())
    .pipe(gulp.dest(config.dist))
    .pipe(rev.manifest())
    .pipe(rename(config.rev_manifest_vendor_scripts))
    .pipe(gulp.dest(config.dist));
});

gulp.task('build-vendor-styles', function() {
  return gulp.src(bower())
    .pipe(filter('**/*.css'))
    .pipe(concat(config.dist_vendor_styles))
    .pipe(gulpif(isNotMinified, minifyCSS()))
    .pipe(rev())
    .pipe(gulp.dest(config.dist))
    .pipe(rev.manifest())
    .pipe(rename(config.rev_manifest_vendor_styles))
    .pipe(gulp.dest(config.dist));
});

var isNotMinified = function(file) {
  var extname = path.extname(file.path);
  if (extname === '.js' || extname === '.css') {
    return path.extname(file.path.substr(0, file.path.length - extname.length)) !== '.min';
  } else {
    return false;
  }
};
