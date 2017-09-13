var gulp = require('gulp');
var twig = require('gulp-twig');

// Compile Twig templates to HTML
gulp.task('templates', function() {
    
});


var build_html = function(file){    
    return gulp.src('src/**/*.html') // run the Twig template parser on all .html files in the "src" directory
        .pipe(twig())
        .pipe(gulp.dest('./build')); // output the rendered HTML files to the "dist" directory
}

gulp.task('build-html', build_html);
module.exports = build_html;