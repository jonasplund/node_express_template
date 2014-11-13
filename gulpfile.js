'use strict';
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint'),
    debug = require('gulp-debug'),
    bower = require('gulp-bower');

var paths = {
  JS_SRC: 'public/src/js/*.js',
  HTML_SRC: 'public/src/*.html',
  SCSS_SRC: 'public/src/sass/*.scss',
  IMG_SRC: 'public/src/img/*.*',

  JS_DEST: 'public/dest/js/',
  HTML_DEST: 'public/dest/',
  CSS_DEST: 'public/dest/css/',
  IMG_DEST: 'public/dest/img/'
}

gulp.task('express', function() {
  var app = require('./index.js');
});

gulp.task('styles', function() {
  return gulp.src(paths.SCSS_SRC).
    pipe(sass({ style: 'expanded' })).
    pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1')).
    pipe(gulp.dest(paths.CSS_DEST)).
    pipe(rename({suffix: '.min'})).
    pipe(minifycss()).
    pipe(gulp.dest(paths.CSS_DEST));
});

gulp.task('img', function () {
    return gulp.src(paths.HTML_SRC).pipe(gulp.dest(paths.HTML_DEST));
});

gulp.task('jshint', function () {
  return gulp.src(paths.JS_SRC).
    pipe(jshint()).
    pipe(jshint.reporter('jshint-stylish', { verbose: true }));
});

gulp.task('js', function () {
  return gulp.src(paths.JS_SRC).
    pipe(gulp.dest(paths.JS_DEST)).
    pipe(rename({suffix: '.min'})).
    pipe(uglify()).
    pipe(gulp.dest(paths.JS_DEST));
});

gulp.task('bower', function() {
  return bower().
    pipe(gulp.dest('public/src/bower_components')).
    pipe(gulp.dest('public/dest/bower_components'));
});

gulp.task('watch', function() {
  gulp.watch(paths.HTML_SRC, ['html']);
  gulp.watch(paths.SCSS_SRC, ['styles']);
  gulp.watch(paths.JS_SRC, ['jshint', 'js']);

  gulp.watch(paths.CSS_DEST + '*.css', notifyLiveReload);
  gulp.watch(paths.JS_DEST + '*.js', notifyLiveReload);
  gulp.watch(paths.HTML_DEST + '*.html', notifyLiveReload);
});

var tinylr;
gulp.task('livereload', function() {
  tinylr = require('tiny-lr')();
  tinylr.listen(4002);
});
function notifyLiveReload(event) {
  var fileName = require('path').relative(__dirname, event.path);
  tinylr.changed({
    body: {
      files: [fileName]
    }
  });
}

gulp.task('default', ['img', 'styles', 'jshint', 'js', 'bower', 'watch', 'livereload', 'express'], function () {
    console.log('Everything rebuilt. Server up and running!');
});

gulp.task('development', ['watch', 'livereload', 'express'], function () {
    console.log('Server up and running!');
});

gulp.task('production', ['express'], function () {
    console.log('Production server up and running!');
});