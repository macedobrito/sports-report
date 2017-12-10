/*global -$ */
'use strict';

var gulp = require('gulp'),
    imagemin = require('gulp-imagemin');

gulp.task('images', ['jsValidate'], function() {
    return gulp.src('./images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});
