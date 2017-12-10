/*global -$ */
'use strict';


var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  sass = require('gulp-ruby-sass'),
  concat = require('gulp-concat'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  scsslint = require('gulp-scss-lint'),
  cssmin = require('gulp-cssmin');


gulp.task('styles', function () {
  return sass('./styles/sass/base.scss')
    .pipe(concat('main.css'))
    .pipe($.sourcemaps.init())
    .pipe($.postcss([
      require('autoprefixer-core')({browsers: ['last 2 version']})
    ]))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(gulp.dest('./styles/'))
    .pipe(reload({stream: true}));
});

gulp.task('css', function() {
    gulp.src([
        './styles/libs/*.css',
        'https://fonts.googleapis.com/icon?family=Material+Icons',
        'node_modules/angular-material/angular-material.min.css'
    ])
    .pipe($.postcss([
        require('autoprefixer-core')({browsers: ['last 2 version']})
    ]))
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./styles/'));
})

gulp.task('mincss', function() {
  gulp.src('./styles/vendor.css')
  .pipe(cssmin());
})

gulp.task('scss-lint', function () {
    gulp.src([
        './sass/**/*.scss'
    ])
    .pipe(scsslint({
        'maxBuffer': 307200000,
        'config': 'scss-lint.yml'
    }));
});
