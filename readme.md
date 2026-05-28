# Лабораторная работа №4: Каталог аниме (Frontend + Backend)

**Дисциплина:** Программирование сетевых приложений

**Группа:** ИУ5Ц-64Б

**Студент:** Тошниёзов Жавохирбек

**Семестр:** 6

## Цель работы
Создание полноценного веб-приложения с frontend-частью и backend-API на Express.js для управления каталогом аниме.

## Структура проекта

```
iu5ts-64b-psp/
├── index.html              # Точка входа frontend
├── main.js                 # Клиентский роутер
├── style.css               # Стили приложения
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
│   ├── home/               # Главная страница
│   ├── product/            # Страница детального просмотра
│   ├── about/              # Обо мне
│   └── calculator/         # Калькулятор
├── components/             # Компоненты UI
│   ├── product-card/
│   ├── product/
│   ├── back-button/
│   └── button/
└── package.json
```

## Backend (Express.js)

### Архитектура (Layered Architecture)

1. **Request** → попадает в `index.js`
2. **Middleware** → парсинг JSON, CORS, логирование
3. **Router** (`routes/`) → маршрутизация
4. **Controller** (`controllers/`) → валидация, вызов сервиса
5. **Service** (`services/`) → бизнес-логика
6. **File/Data** → хранение в JSON-файле

### API Endpoints

| Метод   | Endpoint          | Описание               |
|---------|-------------------|------------------------|
| GET     | `/stocks`         | Получить все карточки   |
| GET     | `/stocks?title=`  | Поиск по названию      |
| GET     | `/stocks/:id`     | Получить одну по ID     |
| POST    | `/stocks`         | Создать новую          |
| PATCH   | `/stocks/:id`     | Обновить по ID         |
| DELETE  | `/stocks/:id`     | Удалить по ID          |

### Структура данных (stocks.json)

```json
{
  "id": 1,
  "src": "https://cover.imglib.info/.../cover.jpg",
  "title": "Магическая битва",
  "text": "Магическая битва (Jujutsu Kaisen) — популярное аниме..."
}
```

## Frontend (SPA)

### Компоненты

- **ProductCardComponent** — карточка аниме с изображением, названием, описанием и кнопкой
- **ProductComponent** — детальный просмотр (описание слева, изображение справа)
- **BackButtonComponent** — кнопка возврата на главную
- **ButtonComponent** — базовая кнопка

### Страницы

- **Главная** — сетка карточек с данными из API
- **Детальный просмотр** — полная информация об аниме
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
npm run dev
```
Сервер запустится на `http://localhost:3000`

### Запуск frontend
Откройте `index.html` в браузере или используйте Live Server.

### Фронтенд + бэкенд
Backend на порту 3000, фронтенд на порту 5500 (Live Server) — работают совместно через CORS.

## Технологии

- **Frontend:** HTML5, JavaScript (ES6 Modules), CSS3
- **Backend:** Node.js, Express.js, CORS
- **Данные:** JSON-файл
- **Архитектура:** Layered Architecture, REST API, SPA

## Вывод
В ходе работы создано полноценное веб-приложение:
- **Frontend** — SPA с роутингом и компонентным подходом
- **Backend** — Express.js API с полным CRUD для управления каталогом

Реализована слоистая архитектура backend, отделяющая маршрутизацию, обработку запросов и бизнес-логику. Данные хранятся в JSON-файле и загружаются на фронтенд через REST API с поддержкой CORS.
