var gulp = require('gulp'); 
var source = require('vinyl-source-stream');  

var copy_file = function(file){
    
    return gulp.src('src/static/**/*')
          .pipe(gulp.dest('./build'));
}

gulp.task('copy-file', copy_file);
module.exports = copy_file;