var gulp = require('gulp');
var shell = require('gulp-shell');
var exec = require('child_process').exec;

gulp.task('auth', function(cb) {
    exec('node src/auth.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('cookie-counter', function(cb) {
     exec('node src/cookie-counter.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('cookie-example', function(cb) {
     exec('node src/cookie-example.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});
    
gulp.task('hello-cookie', function(cb) {
     exec('node src/hello-cookie.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})
