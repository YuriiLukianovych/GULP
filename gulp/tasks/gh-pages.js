import ghPages from 'gulp-gh-pages';


export const ghpages = () => {
    return app.gulp.src('./dist/**/*.*')
        .pipe(ghPages);
}