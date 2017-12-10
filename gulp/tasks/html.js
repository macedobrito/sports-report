/*global -$ */
'use strict';


var gulp = require('gulp'),
    templateCache = require('gulp-angular-templatecache'),
    htmlmin = require('gulp-htmlmin'),
    minifyJS = require('gulp-uglify'),
    RevAll = require('gulp-rev-all'),
    $ = require('gulp-load-plugins')();


gulp.task('html', ['jsValidate', 'styles'], function() {
    var assets = $.useref.assets({
        searchPath: ['.tmp', '.']
    });
    var revAll = new RevAll({
        dontRenameFile: [/^\/index.html/g]
    });

    return gulp.src('./*.html')
        .pipe(assets)
        .pipe($.if('*.js', $.ngAnnotate()))
        .pipe($.if('*.css', $.csso()))
        .pipe($.if('/**/*.html', templateCache()))
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe($.if('*.html', $.htmlmin({
            collapseWhitespace: true
        })))
        .pipe($.if('*.js', minifyJS({
            mangle: false
        })))
        .pipe(revAll.revision())
        .pipe(gulp.dest('dist'));
});


gulp.task('copy:libs', ['jsValidate'], function() {
    return gulp.src([
        './**/*.html',
        './**/*.json',
        '!./index.html'
    ])
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('dist/'));

});
