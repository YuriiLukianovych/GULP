import webp from 'gulp-webp'; // створення webp-картинок
import imagemin from 'gulp-imagemin'; // зжимання картинок, оптимізація

export const images = () => {
    return app.gulp.src(app.path.src.images)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'IMAGES',
                message: 'Error: <%= error.message %>'
            })
        ))
        .pipe(app.plugins.newer(app.path.build.images)) // Перевірка оновлень, щоб двічі не обробляти уже оброблені картинки
        .pipe(webp()) // створення webp-картинок
        .pipe(app.gulp.dest(app.path.build.images)) // і їх вигрузка в папку з результатом
        .pipe(app.gulp.src(app.path.src.images)) // знову отримуємо доступ до ісходніків
        .pipe(app.plugins.if(
            app.isBuild,
            app.plugins.newer(app.path.build.images)
        )) // знову перевіряємо на оновлення
        .pipe(app.plugins.if(
            app.isBuild,
            imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true,
            optimizationLevel: 3 // 0 to 7
        })
        ))
        .pipe(app.gulp.dest(app.path.build.images)) // вигружаємо оброблені картинки в папку з результатом
        .pipe(app.gulp.src(app.path.src.svg)) // вибрати svg
        .pipe(app.gulp.dest(app.path.build.images)) // вигрузити svg в папку з результатом
        .pipe(app.plugins.browsersync.stream())
}