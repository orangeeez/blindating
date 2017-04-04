var gulp = require('gulp');

gulp.task('default', function () {
    // place code for your default task here
});

gulp.task('restore', function () {
    gulp.src([
        'node_modules/@angular/**/*',
        'node_modules/angular2-in-memory-web-api/*.js',
        'node_modules/rxjs/**/*',
        'node_modules/systemjs/dist/*.js',
        'node_modules/zone.js/dist/*.js',
        'node_modules/core-js/client/*.js',
        'node_modules/reflect-metadata/reflect.js',
        'node_modules/bootstrap/dist/**/*.*',
        'node_modules/ng2-bootstrap/bundles/ng2-bootstrap.min.js',
        'node_modules/ng2-file-upload/**/*',
        'node_modules/moment/moment.js',
        'node_modules/jwt-simple/lib/jwt.js',
        'node_modules/angular2-cookie/**/*',
        'node_modules/photoswipe/dist/**/*',
        'node_modules/angular2-jwt/**/*',
        'node_modules/jquery/dist/jquery.min.js'
    ],  {
            base: 'node_modules'
        }).pipe(gulp.dest('./wwwroot/libs'));
});