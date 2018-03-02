var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

gulp.task('sass', function() {
  return gulp.src([
    './src/css/**/main.scss',
  ])
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(concat('main.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.reload({
      stream: true,
    }));
});

gulp.task('js', function() {
  return gulp.src('./src/js/scripts.js')
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.reload({
      stream: true,
    }));
});

gulp.task('pug', function() {
  return gulp.src([
    './src/pug/**/*.pug',
    '!./src/pug/**/_*.pug',
    '!./src/pug/**/_*/**/*.pug',
  ])
    .pipe(pug())
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.reload({
      stream: true,
    }));
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: './dist/',
  });
});

gulp.task('watch', ['pug', 'sass', 'js', 'browserSync'], function() {
  gulp.watch('./src/css/**/*.scss', ['sass']);
  gulp.watch('./src/js/**/*.js', ['js']);
  gulp.watch('./src/pug/**/*.pug', ['pug']);
});

gulp.task('default', ['pug', 'sass', 'js']);

