var gulp = require('gulp'),
        concat = require('gulp-concat'),
        uglify = require('gulp-uglify'),
        inject = require('gulp-inject'),
        del = require('del'),
        print = require('gulp-print'),
        angularFilesort = require('gulp-angular-filesort'),
        templateCache = require('gulp-angular-templatecache'),
        compileTemplate = require('gulp-angular-template'),
        inlineTemplates = require('gulp-inline-angular-templates'),
        nginclude = require('gulp-nginclude'),
        rename = require("gulp-rename"),
        minifyHTML = require('gulp-minify-html'),
        contentInclude = require('gulp-content-includer'),
        runSequence = require('run-sequence'),
        injectEl = require('gulp-inject-element'),
        swig = require('swig'),
        serve = require('gulp-serve'),
        indexFile = './index.html',
        templateFile = 'templates.js',
        appAllFile = 'app-all.min.js';



gulp.task('default', ['injectalljs']);


/* dev */
gulp.task('injectalljs', function () {
    return gulp.src(indexFile).
            pipe(inject(
                    gulp.src(['./js/**/*.js', '!./js/' + appAllFile, '!./js/' + templateFile], {read: true}).
                    pipe(angularFilesort()), {relative: true})
                    ).
            pipe(gulp.dest('./'));
});


/* serve */
gulp.task('serve', serve({
    root: ['.'],
    port: 80
}));
