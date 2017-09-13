var gulp = require('gulp'); 
var source = require('vinyl-source-stream');  
var sass = require('gulp-sass');

var build_sass_min = function(file){    
    return gulp.src('src/style.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('build/css'));
}

gulp.task('build-sass-min', build_sass_min);
module.exports = build_sass_min;