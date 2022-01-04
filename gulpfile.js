const gulp = require('gulp');
const csso = require('gulp-csso');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const del = require('del');
const uglify = require('gulp-uglify');
// Gulp task to minify HTML files
gulp.task('copyHtml', function() {
    return gulp.src('web/**/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('./dist'));
});

// Optimize Images
gulp.task('imageMin', function(done) {
	gulp.src('web/**/*.{png,jpg,jpeg,gif}')
		.pipe(imagemin())
		.pipe(gulp.dest('./dist'))
        done()
});

// gulp.task('imageMin', () =>
//     gulp.src('web/**/*.{png,jpg,jpeg,gif}')
//     .pipe(imagemin())
//     .pipe(gulp.dest('./dist'))
// );
// Gulp task to copy fonts
gulp.task('copyFonts', function() {
    return gulp.src('web/**/*.{eot,otf,svg,ttf,woff,woff2}')
        .pipe(gulp.dest('./dist'));
});
// Gulp task to copy storage
gulp.task('copyStorage', function() {
    return gulp.src('web/**/*.mp3')
        .pipe(gulp.dest('./dist'));
});
// Gulp task to copy json
gulp.task('copyJson', function() {
    return gulp.src('web/**/*.json')
        .pipe(gulp.dest('./dist'));
});

// Gulp task to minify CSS files
gulp.task('styles', function() {
    return gulp.src('web/**/*.css')
        .pipe(csso())
        .pipe(gulp.dest('./dist'))
});

gulp.task('copyJs', function() {
    return gulp.src('web/**/*.js')
        .pipe(uglify({
            mangle: false,
            compress: {
                drop_console: true, // filter console
                drop_debugger: true // filter debugger
            }
        }))
        .pipe(gulp.dest('./dist'));
});
gulp.task('clean', () => del(['./dist']));


gulp.task('default',
    gulp.series('clean', gulp.parallel(
        'copyHtml',
        'imageMin',
        'copyFonts',
        'copyStorage',
        'copyJson',
        'styles',
        'copyJs'
    )));