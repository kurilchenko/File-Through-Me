var gulp = require('gulp')
  , nodemon = require('gulp-nodemon')
  , jshint = require('gulp-jshint')
  , sass = require('gulp-sass')
  , browserify = require('browserify')
  , reactify = require('reactify')
  , del = require('del')
  , source = require('vinyl-source-stream')
  , buffer = require('vinyl-buffer')
  , gutil = require('gulp-util')
  , uglify = require('gulp-uglify');

var paths = {
  html: ['src/html/index.html'],
  images: ['src/images/**/**/**'],
  scss_main: ['src/scss/main.scss'],
  scss: ['src/scss/*.scss'],
  js_main: ['./src/js/app.js'],
  js: ['src/js/**/**'],
};  

gulp.task('watch', function() {
  gulp.watch(paths.scss, ['styles']);
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.images, ['images']);
});

gulp.task('js', ['clean'], function() {
	browserify(paths.js_main, { debug: true })
		.transform(reactify)
		.bundle()
    .on('error', function(err) {
      gutil.beep();
      gutil.log(err);      
    })
		.pipe(source('main.js'))
    .pipe(buffer())
    .pipe(uglify())
		.pipe(gulp.dest('public/assets/js'));
});

gulp.task('styles', function() {
    gulp.src(paths.scss_main)
        .pipe(sass({errLogToConsole: true}))
        .pipe(gulp.dest('public/assets/css'))
});

gulp.task('html', ['clean'], function() {
  gulp.src(paths.html)
    .pipe(gulp.dest('public/'));
});

gulp.task('images', ['clean'], function() {
  gulp.src(paths.images)
    .pipe(gulp.dest('public/assets/images'));
});

// An example of a dependency task, it will be run before the css/js tasks.
// Dependency tasks should call the callback to tell the parent task that
// they're done.
gulp.task('clean', function(done) {
	del(['build'], done);
});

gulp.task('default', ['watch', 'styles', 'js', 'html', 'images']);