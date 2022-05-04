import ghPages from 'gulp-gh-pages';


export const ghPages = () => {
    return app.gulp.src('./dist/**/*.*')
        .pipe(ghPages);
}