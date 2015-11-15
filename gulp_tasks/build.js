var gulp = require('gulp'),
  bower = require('main-bower-files'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  minifyCSS = require('gulp-minify-css'),
  filter = require('gulp-filter'),
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
    .pipe(sourcemaps.write())
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
    .pipe(sourcemaps.write())
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
    .pipe(uglify())
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
    .pipe(minifyCSS())
    .pipe(rev())
    .pipe(gulp.dest(config.dist))
    .pipe(rev.manifest())
    .pipe(rename(config.rev_manifest_vendor_styles))
    .pipe(gulp.dest(config.dist));
});
