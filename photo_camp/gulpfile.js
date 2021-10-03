const gulp = require('gulp');
const webp = require('gulp-webp');
 
gulp.task('default', () =>
    gulp.src('img/*.{jpg,png}')
        .pipe(webp({quality: 100}))
        .pipe(gulp.dest('img'))
);