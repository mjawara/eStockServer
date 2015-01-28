var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    watch = require('gulp-watch');

gulp.task('jshint', function () {
    return gulp.src(['./app/**/*.js', './app.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('watch', function () {
    gulp.watch(['./app/**/*.js', './app.js'], ['jshint']);
});

gulp.task('default', ['jshint', 'watch']);