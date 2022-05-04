import replace from "gulp-replace"; // Пошук та заміна
import plumber from "gulp-plumber"; // Опрацювання помилок
import notify from 'gulp-notify'; // Сповіщення про помилки
import browsersync from "browser-sync"; // локальний сервер
import newer from 'gulp-newer'; // Перевірка оновлень, щоб двічі не обробляти одну і ту ж картинку
import ifPlugin from "gulp-if"; // Умовне розгалуження

export const plugins = {
    replace: replace,
    plumber: plumber,
    notify: notify,
    browsersync: browsersync,
    newer: newer,
    if: ifPlugin
}