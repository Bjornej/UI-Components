var gulp = require('gulp');
var lint = require('gulp-scss-lint');
var sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
	refresh = require('gulp-livereload'),
    lrserver = require('tiny-lr')(),
    express = require('express'),
    livereload = require('connect-livereload')
    livereloadport = 35729,
    serverport = 5000;

var server = express();

server.use(livereload({
  port: livereloadport
}));
server.use(express.static('./dist'));

gulp.task('sass', function() {
	return gulp.src('src/main.scss')
			.pipe(sass({ style: 'expanded' }))
			.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
			.pipe(gulp.dest('dist'))
			.pipe(refresh(lrserver));
});

gulp.task('html', function(){
  gulp.src('views/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(refresh(lrserver));
});


gulp.task('serve', function() {
  //Set up your static fileserver, which serves files in the build dir
  server.listen(serverport);

  //Set up your livereload server
  lrserver.listen(livereloadport);
});

 gulp.task('watch', function() {

  //Add watching on sass-files
  gulp.watch('src/*.scss', function() {
    gulp.run('sass');
  });

  //Add watching on html-files
  gulp.watch('views/*.html', function () {
    gulp.run('html');
  });
});

gulp.task('default',["serve","watch"]);
