# goit-js-hw-10

# Критерии приема

- Создан репозиторий `goit-js-hw-10`.
- При сдаче домашней работы есть две ссылки: на исходные файлы и рабочую
  страницу на `GitHub Pages`.
- При посещении живой страницы задания, в консоли нету ошибок и предупреждений.
- Проект собран с помощью
  [parcel-project-template](https://github.com/goitacademy/parcel-project-template).
- Код отформатирован `Prettier`.

## Стартовые файлы

[Скачай стартовые файлы](https://downgit.github.io/#/home?url=https:%2F%2Fgithub.com%2Fgoitacademy%2Fjavascript-homework%2Ftree%2Fmain%2Fv2%2F10%2Fsrc)
с базовой разметкой и стилями задания. Скопируй их себе в проект, полностью
заменив папку `src` в
[parcel-project-template](https://github.com/goitacademy/parcel-project-template).

# Задание - поиск стран

Создай фронтенд часть приложения поиска данных о стране по её частичному или
полному имени. Посмотри демо видео работы приложения.

<video src="https://user-images.githubusercontent.com/17479434/131147741-7700e8c5-8744-4eea-8a8e-1c3d4635248a.mp4" preload="auto" controls="" style="width: 100%; height: 100%;"></video>

## HTTP-запросы

Используй публичный API [Rest Countries](https://restcountries.com), а именно
[ресурс name](https://restcountries.com/#api-endpoints-v3-name), возвращающий
массив объектов стран удовлетворивших критерий поиска. Добавь минимальное
оформление элементов интерфейса.

Напиши функцию `fetchCountries(name)` которая делает HTTP-запрос на
[ресурс name](https://restcountries.com/#api-endpoints-v3-name) и возвращает
промис с массивом стран - результатом запроса. Вынеси её в отдельный файл
`fetchCountries.js` и сделай именованный экспорт.

## Фильтрация полей

В ответе от бэкенда возвращаются объекты, большая часть свойств которых тебе не
пригодится. Чтобы сократить объем передаваемых данных добавь строку параметров
запроса - так этот бэкенд реализует фильтрацию полей. Ознакомься с
[документацией синтаксиса фильтров](https://restcountries.com/#filter-response).

Тебе нужны только следующие свойства:

- `name.official` - полное имя страны
- `capital` - столица
- `population` - население
- `flags.svg` - ссылка на изображение флага
- `languages` - массив языков

## Поле поиска

Название страны для поиска пользователь вводит в текстовое поле
`input#search-box`. HTTP-запросы выполняются при наборе имени страны, то есть по
событию `input`. Но, делать запрос при каждом нажатии клавиши нельзя, так как
одновременно получится много запросов и они будут выполняться в непредсказуемом
порядке.

Необходимо применить приём `Debounce` на обработчике события и делать
HTTP-запрос спустя `300мс` после того, как пользователь перестал вводить текст.
Используй пакет
[lodash.debounce](https://www.npmjs.com/package/lodash.debounce).

Если пользователь полностью очищает поле поиска, то HTTP-запрос не выполняется,
а разметка списка стран или информации о стране пропадает.

Выполни санитизацию введенной строки методом `trim()`, это решит проблему когда
в поле ввода только пробелы или они есть в начале и в конце строки.

## Интерфейс

Если в ответе бэкенд вернул больше чем 10 стран, в интерфейсе пояляется
уведомление о том, что имя должно быть более специфичным. Для уведомлений
используй библиотеку [notiflix](https://github.com/notiflix/Notiflix#readme) и
выводи такую строку
`"Too many matches found. Please enter a more specific name."`.

<img loading="lazy" src="https://raw.githubusercontent.com/goitacademy/javascript-homework/main/v2/10/preview/too-many-matches.png" alt="Too many matches alert" class="img_ev3q medium-zoom-image">

Если бэкенд вернул от 2-х до 10-х стран, под тестовым полем отображается список
найденных стран. Каждый элемент списка состоит из флага и имени страны.

<img loading="lazy" src="https://raw.githubusercontent.com/goitacademy/javascript-homework/main/v2/10/preview/country-list.png" alt="Country list UI" class="img_ev3q medium-zoom-image">

Если результат запроса это массив с одной страной, в интерфейсе отображается
разметка карточки с данными о стране: флаг, название, столица, население и
языки.

<img loading="lazy" src="https://raw.githubusercontent.com/goitacademy/javascript-homework/main/v2/10/preview/country-info.png" alt="Country info UI" class="img_ev3q medium-zoom-image">

```html
!!!ВНИМАНИЕ!!! Достаточно чтобы приложение работало для большинства стран.
Некоторые страны, такие как Sudan, могут создавать проблемы, поскольку название
страны является частью названия другой страны, South Sudan. Не нужно
беспокоиться об этих исключениях.
```

## Обработка ошибки

Если пользователь ввёл имя страны которой не существует, бэкенд вернёт не пустой
массив, а ошибку со статус кодом `404` - не найдено. Если это не обработать, то
пользователь никогда не узнает о том, что поиск не дал результатов. Добавь
уведомление `"Oops, there is no country with that name"` в случае ошибки
используя [библиотеку notiflix](https://github.com/notiflix/Notiflix#readme).

<img loading="lazy" src="https://raw.githubusercontent.com/goitacademy/javascript-homework/main/v2/10/preview/error-alert.png" alt="Error alert" class="img_ev3q medium-zoom-image">

```html
!!!ВНИМАНИЕ!!! Не забывай о том, что fetch не считает 404 ошибкой, поэтому
необходимо явно отклонить промис чтобы можно было словить и обработать ошибку.
```
