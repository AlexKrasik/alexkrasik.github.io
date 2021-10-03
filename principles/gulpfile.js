const gulp = require('gulp');
const webp = require('gulp-webp');
 
gulp.task('default', () =>
    gulp.src('img/**/*.{jpg,png}')
        .pipe(webp({quality: 80}))
        .pipe(gulp.dest('img/'))
);