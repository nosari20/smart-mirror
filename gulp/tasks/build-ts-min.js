var gulp = require('gulp');  
var buffer = require('vinyl-buffer');  
var source = require('vinyl-source-stream');  
var browserify = require('browserify');  
var tsify = require('tsify');
var uglify = require('gulp-uglify');
var vueify = require('vueify');
var ts = require("typescript");

vueify.compiler.applyConfig({
    customCompilers: {
        ts: function( content , cb ){
            var result = ts.transpileModule( content , { 
                                compilerOptions: { 
                                         module: ts.ModuleKind.CommonJS 
                                }
                         });
            cb( null , result.outputText )            
        }
    }
});

var build_ts_min = function(){
    return browserify()
        .add('./src/main.ts')
        .transform(vueify, { extensions: [ '.vue' ] }) 
        .plugin(tsify,{
            types: ["vue-typescript-import-dts"],
        })
        .bundle()
        .on('error', function (error) { console.error(error.toString()); })
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./build/js/'));
}

gulp.task('build-ts-min', build_ts_min);
module.exports = build_ts_min;