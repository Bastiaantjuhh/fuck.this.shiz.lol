const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

// Paths
const paths = {
    scss: 'src/**/*.scss',
    html: 'src/**/*.html',
    assets: 'assets/**/*',
    cname: 'src/CNAME',
    dist: 'dist'
};

// SCSS -> CSS
function styles() {
    return gulp.src(paths.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer()]))
        .pipe(cleanCSS())
        .pipe(gulp.dest(paths.dist));
}

// HTML copy and minify
function html() {
    return gulp.src(paths.html)
        .pipe(htmlmin({ 
            collapseWhitespace: true,
            continueOnParseError: true,
            html5: true,
            removeComments: true,
            removeStyleLinkTypeAttributes: true,
            sortClassName: true,
            sortAttributes: true
        }))
        .pipe(gulp.dest(paths.dist));
}

// Assets copy
function assets() {
    return gulp.src(paths.assets, {encoding: false})
        .pipe(gulp.dest(paths.dist + '/img/'));
}

function cname() {
    return gulp.src(paths.cname, {encoding: false})
        .pipe(gulp.dest(paths.dist + '/'));
}

// Default task
exports.default = gulp.series(
    gulp.parallel(styles, html, assets, cname),
);