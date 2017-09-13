var run = require('gulp-run');
var rename = require('gulp-rename');
var packageJson = require('./package.json');
var jsonfile = require('jsonfile');
var packager = require('electron-packager')
var gulp = require('./gulp')([
    'build-ts',
    'build-sass',
    'build-html',
    'copy-file',
    'live',
    'build-test',
    'run-test',
    'build-sass-min',
    'build-ts-min',
]);

/* Electron */

var appPackageJSON = {
        name : packageJson.name,
        version: packageJson.version,
        description: packageJson.description,
        main: 'app.js',        
        author: packageJson.author,
        license: packageJson.license,
};

gulp.task('electron:prod',['build:prod'], function(){

    jsonfile.writeFile('./build/package.json', appPackageJSON, function (err) {
        if(err)
            console.error(err)
    });

    gulp.src('src/app.prod.js')
    .pipe(rename('app.js'))
    .pipe(gulp.dest('./build'));

    packager({
        dir: './build',
        out: 'build/pack',
        overwrite: 'true'

    }, function(err, appPaths) {
        if(err)
            console.log(err);
        console.log('App created at : ' + appPaths);
    })
    
});
gulp.task('electron:live', ['build'], function(){

    jsonfile.writeFile('./build/package.json', appPackageJSON, function (err) {
        if(err)
            console.error(err)
    });

    gulp.src('src/app.dev.js')
    .pipe(rename('app.js'))
    .pipe(gulp.dest('./build'))
    .pipe(run('npm run electron ./build'));

});

 
/* Building */
gulp.task('build', ['build-ts', 'build-sass', 'build-html', 'copy-file']);
gulp.task('build:prod', ['build-ts-min', 'build-sass-min', 'build-html', 'copy-file']);

/* Web live dev */
gulp.task('live:web', ['live']);

/*  Watching */
gulp.task('watch', function(){
    ts_watcher = gulp.watch(['src/**/*.ts', 'src/**/*.vue'], ['build-ts']);
    ts_watcher.on('change', function(event) {
        console.log('File [TypeScript]' + event.path + ' was ' + event.type + ', running tasks...');
    });
    
    html_watcher = gulp.watch('src/**/*.html',['build-html']);
    html_watcher.on('change', function(event) {
        console.log('File [HTML] ' + event.path + ' was ' + event.type + ', running tasks...');
    });

    file_watcher = gulp.watch('src/static/**/*',['copy-file']);
    file_watcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

    
    sass_watcher = gulp.watch('src/**/*.scss',['build-sass']);
    sass_watcher.on('change', function(event) {
        console.log('File [SCSS] ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});


/* Testing */
gulp.task('test:build', ['build-test']);

gulp.task('test', ['build-test'], function(){
    gulp.start('run-test');
});
