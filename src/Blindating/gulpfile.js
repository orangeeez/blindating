/// <binding />
var gulp = require('gulp');

var paths = {
    npmSrc: "./node_modules/",
    libTarget: "./wwwroot/libs/",
    cssTarget: "./wwwroot/css/"
};

var libsToMove = [
   paths.npmSrc + '/angular2/bundles/angular2-polyfills.js',
   paths.npmSrc + '/systemjs/dist/system-polyfills.js',
   paths.npmSrc + '/rxjs/bundles/Rx.js',
   paths.npmSrc + '/angular2/bundles/angular2.dev.js',
   paths.npmSrc + '/es6-shim/es6-shim.min.js',
   paths.npmSrc + '/angular2/bundles/router.dev.js',
   paths.npmSrc + '/angular2/bundles/http.dev.js',
   paths.npmSrc + '/ng2-bootstrap/bundles/ng2-bootstrap.min.js',
   paths.npmSrc + '/moment/moment.js',
   paths.npmSrc + '/croppie/croppie.min.js',
   paths.npmSrc + '/jquery/dist/jquery.min.js',
   paths.npmSrc + '/photoswipe/dist/photoswipe.min.js',
   paths.npmSrc + '/photoswipe/dist/photoswipe-ui-default.min.js'
];

var cssToMove = [
    paths.npmSrc + '/photoswipe/dist/photoswipe.css',
    paths.npmSrc + '/photoswipe/dist/default-skin/default-skin.css'
];

gulp.task('moveToLibs', function () {
    return gulp.src(libsToMove).pipe(gulp.dest(paths.libTarget));
});
gulp.task('moveToCSS', function () {
    return gulp.src(cssToMove).pipe(gulp.dest(paths.cssTarget));
});