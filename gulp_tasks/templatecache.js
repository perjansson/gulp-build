var gulp = require('gulp'),
  templateCache = require('gulp-angular-templatecache'),
  minifyHTML = require('gulp-minify-html'),
  config = require('../gulp.config')();

gulp.task('templatecache', function() {
  return gulp.src(config.partials)
    .pipe(minifyHTML({
      quotes: true,
      conditionals: true,
      spare: true
    }))
    .pipe(templateCache(config.templatejs, {
      module: 'gulpBuildApp',
      root: 'app/partials/',
      standAlone: false
    }))
    .pipe(gulp.dest(config.template_path));
});
