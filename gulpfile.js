/**
 * Created by jin on 16/3/4.
 */

const gulpWebpack = require('gulp-webpack');
const webpackConfig = require('./webpack.config');

const path = require('path');
const gulp = require('gulp');
const scp = require('gulp-scp2');
//const runSequence = require('run-sequence');
//const clean = require('gulp-clean');

gulp.task('czwJs', function () {
    'use strict';
    gulp.src('./static/js/page/**/*.js')
        .pipe(gulpWebpack(webpackConfig))
        .pipe(gulp.dest('dist/js'));//.pipe管道,流的形式输出输入
});

gulp.task('czwTemplate',function(){
    'use strict';
    gulp.src('./template/*')
        .pipe(gulp.dest('dist/template'))
});

gulp.task('czwThird',function(){
    'use strict';
    gulp.src('./static/js/third/*.js')
        .pipe(gulp.dest('dist/js'));
});

gulp.task('czwCss',function(){
    'use strict';
    gulp.src('./static/css/*')
        .pipe(gulp.dest('dist/css'));
});

gulp.task('czwFont',function(){
    'use strict';
    gulp.src('./static/font/*')
        .pipe(gulp.dest('dist/font'));
});

gulp.task('czwImg',function(){
    'use strict';
    gulp.src('./static/images/*')
        .pipe(gulp.dest('dist/img'));
});

gulp.task('appText',['czwJs','czwTemplate','czwThird','czwCss','czwFont','czwImg']);