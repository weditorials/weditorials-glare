var gulp = require('gulp');
var gutil = require('gulp-util');

var jekyll = require("gulp-jekyll");
var notify = require("gulp-notify");

gulp.task('jekyll', function () {
    gulp.src(['./**/*'])
        .pipe(notify({ title: "gulp-jekyll",message: "Starting!" }))
        .pipe(
          jekyll({
            source: './',
            destination: './_site/',
            baseurl: '',
            bundleExec: true
          })
        )
        .pipe(notify( { title: "gulp-jekyll",message: "Mr. Hyde" } ))
        .pipe(gulp.dest('./_site/'));
});

gulp.task('default', function(){
  // place code for your default task here
});

//jekyll
// gulp.task('default', function () {
//     gulp.src(['./index.html', './_layouts/*.html', './_posts/*.{markdown,md}'])
//         .pipe(jekyll({
//             source: './',
//             destination: './deploy/',
//             bundleExec: true
//         }))
//         .pipe(gulp.dest('./deploy/'));
// });

//plumber
// gulp.src('coffee/**/*.coffee')
//   .pipe(plumber())
//   .pipe(gulpPrefixer('// Copyright 2014 (C) Aswesome company'))
//   .pipe(coffee())
//   .pipe(gulp.dest('js/'));

// .pipe(notify({ title: "Gulp.js",message: "Hello Gulp!" }));


//size
// gulp.task('default', function () {
//     gulp.src('fixture.js')
//         .pipe(size())
//         .pipe(gulp.dest('dist'));
// });
