import svgSprite from 'gulp-svg-sprite';

export const createSvgSprite = () => {
    return app.gulp.src(app.path.src.svgicons)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'SVG',
                message: 'Error: <%= error.message %>'
            })
        ))
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: `../icons/svg-sprite.svg`,
                    // Створювати сторінку зі списком іконок
                    example: false
                }
            }
        }))
        .pipe(app.gulp.dest(app.path.build.images)) // вигрузити svg-спрайт в папку з результатом
}