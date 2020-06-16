'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var imagemin = require('gulp-imagemin');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var fileinclude = require('gulp-file-include');

sass.compiler = require('node-sass');

gulp.task('sass', function () {
    return gulp.src([
        'src/scss/**/*.scss',
        'node_modules/bootstrap/scss/bootstrap.scss',
        'node_modules/bootstraplus/sass/bootstraplus.sass',
        'src/fonts/fontawesome/css/all.min.css'
    ])
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(postcss([autoprefixer({
        grid: true,
        Browserslist: ['>1%']
    })]))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream());
});

gulp.task('css', function () {
    return gulp.src([
        'src/css/*css'
    ])
    .pipe(gulp.dest('build/css'))
});

gulp.task('scripts', function () {
    return gulp.src([
        'src/js/**/*.js',
        'node_modules/bootstrap/dist/js/bootstrap.js',
        'node_modules/jquery/dist/jquery.js',
        'node_modules/popper.js/dist/popper.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['@babel/env'],
        plugins: ['@babel/plugin-proposal-class-properties']
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('build/js'))
});

gulp.task('html', function () {
    return gulp.src('src/**/**/*.html')
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'))
});

gulp.task('images', function () {
    return gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('build/images'));
});

gulp.task('fonts', function () {
    return gulp.src('src/fonts/*')
    .pipe(imagemin())
    .pipe(gulp.dest('build/fonts'));
});

gulp.task('watch', function () {
    browserSync.init({
        server: 'build'
    });
    gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
    gulp.watch('src/js/*.js', gulp.series('scripts')).on('change', browserSync.reload);
    gulp.watch('src/**/**/*.html', gulp.series('html')).on('change', browserSync.reload);
});

gulp.task('default', gulp.parallel('css', 'sass', 'scripts', 'html'));
