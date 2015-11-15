var argv = require('yargs').argv;

module.exports = function() {

  var config = {
    production: argv.production,

    scripts: 'app/scripts/**/*.js',
    styles: 'app/styles/**/*.css',

    partials: 'app/partials/**/*.html',
    template_path: 'app/scripts/templates/',
    templatejs: 'templates.js',

    rev_manifest_scripts: 'rev-manifest-scripts.json',
    rev_manifest_styles: 'rev-manifest-styles.json',
    rev_manifest_vendor_scripts: 'rev-manifest-vendor-scripts.json',
    rev_manifest_vendor_styles: 'rev-manifest-vendor-styles.json',

    dist: './dist/',
    dist_scripts: 'scripts.min.js',
    dist_vendor_scripts: 'vendor.min.js',
    dist_styles: 'styles.min.css',
    dist_vendor_styles: 'vendor.min.css',
  }

  return config;
};
