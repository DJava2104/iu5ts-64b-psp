// Получаем элементы
const resultDisplay = document.getElementById('result');
const themeToggle = document.getElementById('theme-toggle');

// Переменные для калькулятора
let currentValue = '0';
let previousValue = '';
let operation = null;
let shouldResetScreen = false;

// Функция обновления дисплея
function updateDisplay() {
    resultDisplay.textContent = currentValue;
}

// Функция добавления цифры
function appendNumber(number) {
    if (currentValue === '0' || shouldResetScreen) {
        currentValue = number;
        shouldResetScreen = false;
    } else {
        currentValue += number;
    }
    updateDisplay();
}

// Функция добавления десятичной точки
function appendDot() {
    if (shouldResetScreen) {
        currentValue = '0.';
        shouldResetScreen = false;
        updateDisplay();
        return;
    }
    
    if (!currentValue.includes('.')) {
        currentValue += '.';
        updateDisplay();
    }
}

// Функция очистки
function clearScreen() {
    currentValue = '0';
    previousValue = '';
    operation = null;
    updateDisplay();
}

// Функция смены знака
function changeSign() {
    currentValue = (parseFloat(currentValue) * -1).toString();
    updateDisplay();
}

// Функция процента
function percent() {
    currentValue = (parseFloat(currentValue) / 100).toString();
    updateDisplay();
}

// Функция выбора операции
function chooseOperation(op) {
    if (currentValue === '') return;
    
    if (previousValue !== '') {
        calculate();
    }
    
    operation = op;
    previousValue = currentValue;
    shouldResetScreen = true;
}

// Функция вычисления
function calculate() {
    if (operation === null || previousValue === '' || currentValue === '') return;
    
    let result;
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    
    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case 'x':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert('На ноль делить нельзя!');
                clearScreen();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    
    currentValue = result.toString();
    operation = null;
    previousValue = '';
    shouldResetScreen = true;
    updateDisplay();
}

// Функция смены темы
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const themeBtn = document.getElementById('theme-toggle');
    if (document.body.classList.contains('dark-theme')) {
        themeBtn.textContent = '☀️ Светлая тема';
    } else {
        themeBtn.textContent = '🌙 Сменить тему';
    }
}

// Обработчики событий для цифр
document.querySelectorAll('[id^="btn_digit_"]').forEach(button => {
    button.addEventListener('click', () => {
        const digit = button.textContent;
        appendNumber(digit);
    });
});

// Обработчик для точки
const dotButton = document.getElementById('btn_digit_dot');
if (dotButton) {
    dotButton.addEventListener('click', appendDot);
}

// Обработчик для очистки
const clearButton = document.getElementById('btn_op_clear');
if (clearButton) {
    clearButton.addEventListener('click', clearScreen);
}

// Обработчик для смены знака
const signButton = document.getElementById('btn_op_sign');
if (signButton) {
    signButton.addEventListener('click', changeSign);
}

// Обработчик для процента
const percentButton = document.getElementById('btn_op_percent');
if (percentButton) {
    percentButton.addEventListener('click', percent);
}

// Обработчики для операций
document.querySelectorAll('[id^="btn_op_"]:not(#btn_op_clear):not(#btn_op_sign):not(#btn_op_percent):not(#btn_op_equal)').forEach(button => {
    button.addEventListener('click', () => {
        const op = button.textContent;
        chooseOperation(op);
    });
});

// Обработчик для равно
const equalButton = document.getElementById('btn_op_equal');
if (equalButton) {
    equalButton.addEventListener('click', calculate);
}

// Обработчик для смены темы
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

// Клавиатурная поддержка
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        appendNumber(e.key);
    } else if (e.key === '.') {
        appendDot();
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        let op = e.key;
        if (op === '*') op = 'x';
        chooseOperation(op);
    } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculate();
    } else if (e.key === 'Escape') {
        clearScreen();
    } else if (e.key === '%') {
        percent();
    }
});

// Инициализация
updateDisplay();