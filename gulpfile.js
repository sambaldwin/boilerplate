var autoprefixer = require("gulp-autoprefixer");
var browserSync = require("browser-sync").create();
var concat = require("gulp-concat");
var cssmin = require("gulp-cssmin");
var gulp = require("gulp");
var pug = require("gulp-pug");
var sass = require("gulp-sass");
var uglify = require("gulp-uglify");

gulp.task("browserSync", function() {
  browserSync.init({
    server: "./dist/"
  });
});

gulp.task("fonts", function() {
  return gulp
    .src(["./src/fonts/**/*", "!./src/fonts/.gitkeep"])
    .pipe(gulp.dest("./dist/fonts/"));
});

gulp.task("js", function() {
  return gulp
    .src("./src/js/scripts.js")
    .pipe(concat("scripts.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("./dist/"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task("pug", function() {
  return gulp
    .src([
      "./src/pug/**/*.pug",
      "!./src/pug/**/_*.pug",
      "!./src/pug/**/_*/**/*.pug"
    ])
    .pipe(pug())
    .pipe(gulp.dest("./dist/"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task("sass", function() {
  return gulp
    .src(["./src/css/**/main.scss"])
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(concat("main.css"))
    .pipe(cssmin())
    .pipe(gulp.dest("./dist/"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task("default", gulp.series(["fonts", "js", "pug", "sass"]));

gulp.task(
  "watch",
  gulp.parallel(["default", "browserSync"], function() {
    gulp.watch("./src/js/**/*.js", gulp.parallel("js"));
    gulp.watch("./src/pug/**/*.pug", gulp.parallel("pug"));
    gulp.watch("./src/css/**/*.scss", gulp.parallel("sass"));
  })
);
