# Лабораторная работа №5: AJAX-запросы к API

**Дисциплина:** Программирование сетевых приложений

**Группа:** ИУ5Ц-64Б

**Студент:** Тошниёзов Жавохирбек

**Семестр:** 6

## Цель работы
Взаимодействие с внешним API через XMLHttpRequest (XHR). Получение данных и вывод их в интерфейс пользователя.

## Структура проекта

```
iu5ts-64b-psp/
├── index.html              # Точка входа frontend
├── main.js                 # Клиентский роутер
├── modules/                # Работа с API
│   ├── ajax.js             # XMLHttpRequest обёртка
│   └── stockUrls.js        # URL-адреса API
├── src/                    # Backend (Express.js)
│   ├── index.js            # Точка входа сервера
│   ├── routes/             # Маршруты API
│   │   └── stocks.js
│   ├── controllers/        # Обработчики запросов
│   │   └── stocksController.js
│   ├── services/           # Бизнес-логика
│   │   ├── stocksService.js
│   │   └── fileService.js
│   └── data/               # Хранение данных
│       └── stocks.json
├── pages/                  # Страницы frontend
│   ├── home/               # Главная страница (фильтр карточек)
│   ├── product/            # Детальный просмотр
│   ├── about/              # О проекте
│   └── calculator/         # Калькулятор
├── components/             # Компоненты UI
│   ├── product-card/
│   ├── product/
│   ├── back-button/
│   └── button/
└── package.json
```

## Что такое XMLHttpRequest

[XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) (XHR) позволяет делать HTTP-запросы к серверу из браузера без перезагрузки страницы.

## Модули для работы с API

### modules/ajax.js
Обёртка над XMLHttpRequest с методами:
- `get(url, callback)` — GET-запрос
- `post(url, data, callback)` — POST-запрос
- `patch(url, data, callback)` — PATCH-запрос
- `delete(url, callback)` — DELETE-запрос

### modules/stockUrls.js
Хранит URL-адреса API:
- `getStocks(title)` — получить все карточки (с опциональной фильтрацией)
- `getStockById(id)` — получить одну по ID
- `createStock()` — создать новую
- `removeStockById(id)` — удалить по ID
- `updateStockById(id)` — обновить по ID

## Реализованный функционал

### 1. Фильтрация карточек (главная страница)
На главной странице добавлено поле ввода для фильтрации:
- Фильтрация карточек по названию в реальном времени (по мере ввода)
- Ограничение количества отображаемых карточек

### 2. Детальный просмотр (страница продукта)
При клике на карточку открывается страница с полной информацией:
- Загрузка данных через AJAX-запрос по ID
- Кнопка возврата на главную

### 3. REST API
Backend поддерживает полный CRUD через XMLHttpRequest-запросы с фронтенда.

## Backend (Express.js)

### Архитектура (Layered Architecture)

1. **Request** → попадает в `src/index.js`
2. **Middleware** → парсинг JSON, CORS, логирование
3. **Router** (`src/routes/`) → маршрутизация
4. **Controller** (`src/controllers/`) → валидация, вызов сервиса
5. **Service** (`src/services/`) → бизнес-логика
6. **File/Data** → хранение в JSON-файле

### API Endpoints

| Метод   | Endpoint               | Описание               |
|---------|------------------------|------------------------|
| GET     | `/stocks`              | Получить все карточки   |
| GET     | `/stocks?title=...`   | Фильтрация по названию  |
| GET     | `/stocks/:id`          | Получить одну по ID     |
| POST    | `/stocks`              | Создать новую           |
| PATCH   | `/stocks/:id`          | Обновить по ID          |
| DELETE  | `/stocks/:id`          | Удалить по ID           |

### Структура данных (stocks.json)

```json
{
  "id": 1,
  "src": "https://cover.imglib.info/.../cover.jpg",
  "title": "Магическая битва",
  "text": "Магическая битва (Jujutsu Kaisen) — популярное аниме...",
  "detailText": "Полное описание аниме..."
}
```

## Frontend (SPA)

### Компоненты

- **ProductCardComponent** — карточка аниме с изображением, названием, описанием и кнопкой
- **ProductComponent** — детальный просмотр (описание слева, изображение справа)
- **BackButtonComponent** — кнопка возврата на главную
- **ButtonComponent** — базовая кнопка

### Страницы

- **Главная** — сетка карточек с данными из API, фильтрация по названию
- **Детальный просмотр** — полная информация об аниме (загрузка через AJAX)
- **Калькулятор** — инженерный калькулятор
- **Обо мне** — информация о студенте

### Роутинг

Хеш-роутинг в `main.js`:
```js
window.addEventListener('hashchange', router);
window.addEventListener('load', router);
```

## Запуск

### Установка зависимостей
```bash
npm install
```

### Запуск сервера (backend)
```bash
npm start
```
Сервер запустится на `http://localhost:3000`

### Запуск frontend
Откройте `index.html` в браузере или используйте Live Server.

## Технологии

- **Frontend:** HTML5, JavaScript (ES6 Modules), CSS3, XMLHttpRequest
- **Backend:** Node.js, Express.js, CORS
- **Данные:** JSON-файл
- **Архитектура:** Layered Architecture, REST API, SPA

## Вывод
В ходе работы:
- Реализована работа с API через XMLHttpRequest
- Добавлена фильтрация карточек по названию
- Реализован детальный просмотр карточек с загрузкой данных через AJAX
- Backend поддерживает полный CRUD для управления каталогом
