/*global -$ */
'use strict';


var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    concat = require('gulp-concat'),
    jsValidate = require('gulp-jsvalidate'),
    debug = require('gulp-debug');


gulp.task('concat-js', ['jsValidate'], function() {
    return gulp.src('./scripts/libs/*.js')
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('./scripts/'));
});

gulp.task('jshint', function() {
    return gulp.src(['./scripts/**/*.js', '!app/scripts/libs/**', '!./scripts/vendor.js'])
        .pipe(reload({
            stream: true,
            once: true
        }))
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

gulp.task('jsValidate', function(cb) {
    return gulp.src(['./scripts/**/*.js'])
        .pipe($.debug())
        .pipe(jsValidate())
    cb(err)
});
