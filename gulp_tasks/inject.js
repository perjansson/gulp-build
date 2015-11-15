var gulp = require('gulp'),
  inject = require('gulp-inject'),
  config = require('../gulp.config')();

gulp.task('inject', function() {
  var manifest_scripts = require('../dist/' + config.rev_manifest_scripts);
  var manifest_styles = require('../dist/' + config.rev_manifest_styles);
  var manifest_vendor_scripts = require('../dist/' + config.rev_manifest_vendor_scripts);
  var manifest_vendor_styles = require('../dist/' + config.rev_manifest_vendor_styles);

  return gulp.src('index.html')
    .pipe(inject(
      gulp.src([config.dist + manifest_vendor_scripts[config.dist_vendor_scripts], config.dist + manifest_vendor_styles[config.dist_vendor_styles]], {
        read: false
      }), {
        name: 'bower',
        relative: true
      }))
    .pipe(inject(
      gulp.src(config.dist + manifest_scripts[config.dist_scripts], {
        read: false
      }), {
        relative: true
      }))
    .pipe(inject(
      gulp.src(config.dist + manifest_styles[config.dist_styles], {
        read: false
      }), {
        relative: true
      }))
    .pipe(gulp.dest('./'))
});
