import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css'; // Мініфікація (зжимання) CSS файла
import webpcss from 'gulp-webpcss'; // Вивід webp-зображень
import autoprefixer from 'gulp-autoprefixer'; // додавання вендорних префіксів
import groupCssMediaQueries from 'gulp-group-css-media-queries'; // групування медіа-запитів

const sass = gulpSass(dartSass);

export const scss = () => {
    return app.gulp.src(app.path.src.scss, {sourcemaps: app.isDev})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'SCSS',
                message: 'Error: <%= error.message %>'
            })
        ))
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(app.plugins.replace(/@img\//g, '../img/'))
        .pipe(app.plugins.if(
            app.isBuild,
            groupCssMediaQueries()
        ))
        .pipe(app.plugins.if(
            app.isBuild,
            webpcss({
                webpClass: '.webp',
                noWebpClass: '.no-webp'
                // важливо встановити конвертер саме такої версії: npm i -D webp-converter@2.2.3
            })
        ))
        .pipe(app.plugins.if(
            app.isBuild,
            autoprefixer({
                grid: true,
                overrideBrowserslist: ['last 3 version'],
                cascade: true
            })
        ))
        // .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.if(
            app.isBuild,
            cleanCss() // Мініфікація (зжимання) CSS файла
        ))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browsersync.stream())
}