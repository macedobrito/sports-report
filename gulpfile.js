/*global -$ */
'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    requireDir = require('require-dir');
requireDir('./gulp/tasks');

gulp.task('serve:dist', function() {
    browserSync({
        notify: false,
        port: 9000,
        ghostMode: false,
        server: {
            baseDir: ['dist']
        }
    });
});


gulp.task('serve', ['jsValidate', 'styles', 'css', 'concat-js', 'mincss'], function() {
    browserSync({
        notify: false,
        port: 9000,
        open: false,
        ghostMode: false,
        server: {
            baseDir: ['.tmp', './'],
            routes: {
                '/node_modules': 'node_modules'
            }
        }
    });


    // watch for changes
    gulp.watch([
        './*.html',
        './styles/**/*.scss',
        './styles/fonts/**/*',
        './scripts/**/*.js',
        './images/**/*'
    ]).on('change', reload);

    gulp.watch(['./scripts/**/*.js', 'test/**/*Spec.js'], ['concat-js']);
    gulp.watch('./sass/**/*.scss', ['styles', 'scss-lint', 'mincss']);
    gulp.watch('./sass/**/*.css', ['css']);
});

gulp.task('fonts', ['jsValidate'], function() {
    return gulp.src([
            'app/styles/fonts/*'
        ])
        .pipe(gulp.dest('dist/styles/fonts/'));
});

gulp.task('build', ['jsValidate', 'fonts', 'css', 'html', 'copy:libs'], function() {
    return gulp.src('dist/**/*').pipe($.size({
        title: 'build',
        gzip: true
    }));
});

gulp.task('default', ['clean'], function() {
    gulp.start('serve');
});

