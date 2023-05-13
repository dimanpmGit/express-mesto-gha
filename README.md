[![Tests](../../actions/workflows/tests-13-sprint.yml/badge.svg)](../../actions/workflows/tests-13-sprint.yml) [![Tests](../../actions/workflows/tests-14-sprint.yml/badge.svg)](../../actions/workflows/tests-14-sprint.yml)
# Проект Mesto фронтенд + бэкенд

## Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки  
  
Остальные директории вспомогательные, создаются при необходимости разработчиком

## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload

### Обзор

* Адаптивная верстка с использованием Grid.
* JS - обработка событий.
* Валидация форм.
* ООП реализация классов работы с карточками и формами.
* Использованы модули js, импорт/экспорт методов и объектов между ними.
* Использованы принципы "слабого связывания" классов.
* Настроен Webpack.
* Реализовано API взаимодействия с сервером: подгрузка карточек, создание/удаление карточки, лайк/дизлайк карточки, история лайков, редактирование информации в профиле, обновление аватарки.
* Взаимодействие с сервером реализовано с использованием асинхронных запросов.

### О проекте

Проект о красивых туристических местах России. Новые места можно добавлять и редактировать.
При загрузке страницы выводятся 6 карточек о различных местах.
Редактирование профиля доступно при нажатии кнопки редактирования. Открывается форма редактирования.
При нажатии кнопки [+] открывается форма добавления новой карточки.
При нажатии на картинку карточки открывается картинка на весь экран.
Закрыть все формы можно 3 способами:
* Нажатием крестика справа сверху от формы;
* Нажатием по области вне формы или картинки;
* Нажатием клавиши [Esc].
Также формы редактирования профиля и добавления закрываются при корректном заполении полей нажатием кнопки [Сохранить/Создать] или клавиши [Enter].
Поля всех форм валидируются с выводом ошибок заполнения.
Каждую карточку можно удалить нажатием на кнпку с корзиной.
Каждую карточку можно отметить нажатием на кнопку с сердечком.

Протестировано в браузерах Google Chrome (в том числе с Pixel Perfect), Yandex, Firefox, Opera, Safari.

**GitHub Pages**

* [Ссылка на GitHub Pages](https://github.com/dimanpmGit/express-mesto-gha)
