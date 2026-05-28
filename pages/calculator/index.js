export class CalculatorPage {
    constructor(parent) {
        this.parent = parent;
        this.currentValue = '0';
        this.previousValue = '';
        this.operation = null;
        this.shouldResetScreen = false;
        this.memoryValue = 0;
    }

    getHTML() {
        return (
            `
                <div class="container calculator-page">
                    <div class="calculator-container">
                        <div class="calculator">
                            <div id="result" class="result">0</div>
                            <div class="buttons-grid">
                                <div class="button-row">
                                    <button id="btn_op_clear" class="my-btn secondary">C</button>
                                    <button id="btn_op_backspace" class="my-btn secondary">←</button>
                                    <button id="btn_op_sqrt" class="my-btn secondary">√</button>
                                    <button id="btn_op_square" class="my-btn secondary">x²</button>
                                    <button id="btn_op_div" class="my-btn primary">/</button>
                                </div>
                                <div class="button-row">
                                    <button id="btn_op_percent" class="my-btn secondary">%</button>
                                    <button id="btn_op_factorial" class="my-btn secondary">x!</button>
                                    <button id="btn_op_mem_add" class="my-btn secondary">M+</button>
                                    <button id="btn_op_mem_sub" class="my-btn secondary">M-</button>
                                    <button id="btn_op_mult" class="my-btn primary">x</button>
                                </div>
                                <div class="button-row">
                                    <button id="btn_digit_7" class="my-btn">7</button>
                                    <button id="btn_digit_8" class="my-btn">8</button>
                                    <button id="btn_digit_9" class="my-btn">9</button>
                                    <button id="btn_digit_000" class="my-btn">000</button>
                                    <button id="btn_op_minus" class="my-btn primary">-</button>
                                </div>
                                <div class="button-row">
                                    <button id="btn_digit_4" class="my-btn">4</button>
                                    <button id="btn_digit_5" class="my-btn">5</button>
                                    <button id="btn_digit_6" class="my-btn">6</button>
                                    <button id="btn_op_plus" class="my-btn primary">+</button>
                                </div>
                                <div class="button-row">
                                    <button id="btn_digit_1" class="my-btn">1</button>
                                    <button id="btn_digit_2" class="my-btn">2</button>
                                    <button id="btn_digit_3" class="my-btn">3</button>
                                    <button id="btn_op_equal" class="my-btn primary execute">=</button>
                                </div>
                                <div class="button-row">
                                    <button id="btn_digit_0" class="my-btn">0</button>
                                    <button id="btn_digit_dot" class="my-btn">.</button>
                                    <button id="btn_op_cube" class="my-btn secondary">x³</button>
                                </div>
                            </div>
                        </div>

                        <details class="author-details">
                            <summary>👤 Автор</summary>
                            <p>ФИО: Тошниёзов Жавохирбек Голибжон угли</p>
                            <p>Группа: ИУ5Ц-64Б</p>
                        </details>
                    </div>
                </div>
            `
        );
    }

    updateDisplay() {
        document.getElementById('result').textContent = this.currentValue;
    }

    appendNumber(number) {
        if (this.currentValue === '0' || this.shouldResetScreen) {
            this.currentValue = number;
            this.shouldResetScreen = false;
        } else {
            this.currentValue += number;
        }
        this.updateDisplay();
    }

    appendThreeZeros() {
        if (this.currentValue === '0' || this.shouldResetScreen) {
            this.currentValue = '000';
            this.shouldResetScreen = false;
        } else {
            this.currentValue += '000';
        }
        this.updateDisplay();
    }

    appendDot() {
        if (this.shouldResetScreen) {
            this.currentValue = '0.';
            this.shouldResetScreen = false;
            this.updateDisplay();
            return;
        }
        if (!this.currentValue.includes('.')) {
            this.currentValue += '.';
            this.updateDisplay();
        }
    }

    clearScreen() {
        this.currentValue = '0';
        this.previousValue = '';
        this.operation = null;
        this.updateDisplay();
    }

    backspace() {
        if (this.currentValue.length > 1) {
            this.currentValue = this.currentValue.slice(0, -1);
        } else {
            this.currentValue = '0';
        }
        this.updateDisplay();
    }

    percent() {
        this.currentValue = (parseFloat(this.currentValue) / 100).toString();
        this.updateDisplay();
    }

    sqrt() {
        const val = parseFloat(this.currentValue);
        if (val < 0) {
            alert('Нельзя извлечь корень из отрицательного числа!');
            return;
        }
        this.currentValue = Math.sqrt(val).toString();
        this.shouldResetScreen = true;
        this.updateDisplay();
    }

    square() {
        const val = parseFloat(this.currentValue);
        this.currentValue = (val * val).toString();
        this.shouldResetScreen = true;
        this.updateDisplay();
    }

    cube() {
        const val = parseFloat(this.currentValue);
        this.currentValue = (val * val * val).toString();
        this.shouldResetScreen = true;
        this.updateDisplay();
    }

    factorial() {
        const val = parseFloat(this.currentValue);
        if (val < 0 || !Number.isInteger(val)) {
            alert('Факториал только для целых неотрицательных чисел!');
            return;
        }
        let result = 1;
        for (let i = 2; i <= val; i++) {
            result *= i;
        }
        this.currentValue = result.toString();
        this.shouldResetScreen = true;
        this.updateDisplay();
    }

    memAdd() {
        this.memoryValue += parseFloat(this.currentValue);
        this.currentValue = '0';
        this.shouldResetScreen = true;
        this.updateDisplay();
    }

    memSub() {
        this.memoryValue -= parseFloat(this.currentValue);
        this.currentValue = '0';
        this.shouldResetScreen = true;
        this.updateDisplay();
    }

    chooseOperation(op) {
        if (this.currentValue === '') return;
        if (this.previousValue !== '') {
            this.calculate();
        }
        this.operation = op;
        this.previousValue = this.currentValue;
        this.shouldResetScreen = true;
    }

    calculate() {
        if (this.operation === null || this.previousValue === '' || this.currentValue === '') return;

        let result;
        const prev = parseFloat(this.previousValue);
        const current = parseFloat(this.currentValue);

        switch (this.operation) {
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
                    this.clearScreen();
                    return;
                }
                result = prev / current;
                break;
            default:
                return;
        }

        this.currentValue = result.toString();
        this.operation = null;
        this.previousValue = '';
        this.shouldResetScreen = true;

        const hue = Math.random() * 360;
        document.querySelector('.result').style.backgroundColor = `hsl(${hue}, 100%, 50%)`;

        this.updateDisplay();
    }

    addListeners() {
        document.querySelectorAll('[id^="btn_digit_"]').forEach(button => {
            button.addEventListener('click', () => {
                const digit = button.textContent;
                this.appendNumber(digit);
            });
        });

        document.getElementById('btn_digit_000').addEventListener('click', () => this.appendThreeZeros());
        document.getElementById('btn_digit_dot').addEventListener('click', () => this.appendDot());
        document.getElementById('btn_op_clear').addEventListener('click', () => this.clearScreen());
        document.getElementById('btn_op_backspace').addEventListener('click', () => this.backspace());
        document.getElementById('btn_op_percent').addEventListener('click', () => this.percent());
        document.getElementById('btn_op_sqrt').addEventListener('click', () => this.sqrt());
        document.getElementById('btn_op_square').addEventListener('click', () => this.square());
        document.getElementById('btn_op_cube').addEventListener('click', () => this.cube());
        document.getElementById('btn_op_factorial').addEventListener('click', () => this.factorial());
        document.getElementById('btn_op_mem_add').addEventListener('click', () => this.memAdd());
        document.getElementById('btn_op_mem_sub').addEventListener('click', () => this.memSub());

        document.querySelectorAll('[id^="btn_op_"]:not(#btn_op_clear):not(#btn_op_backspace):not(#btn_op_percent):not(#btn_op_sqrt):not(#btn_op_square):not(#btn_op_cube):not(#btn_op_factorial):not(#btn_op_mem_add):not(#btn_op_mem_sub):not(#btn_op_equal)').forEach(button => {
            button.addEventListener('click', () => {
                const op = button.textContent;
                this.chooseOperation(op);
            });
        });

        document.getElementById('btn_op_equal').addEventListener('click', () => this.calculate());

        document.addEventListener('keydown', (e) => {
            if (e.key >= '0' && e.key <= '9') {
                this.appendNumber(e.key);
            } else if (e.key === '.') {
                this.appendDot();
            } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
                let op = e.key;
                if (op === '*') op = 'x';
                this.chooseOperation(op);
            } else if (e.key === 'Enter' || e.key === '=') {
                e.preventDefault();
                this.calculate();
            } else if (e.key === 'Escape') {
                this.clearScreen();
            } else if (e.key === 'Backspace') {
                e.preventDefault();
                this.backspace();
            }
        });
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.updateDisplay();
        this.addListeners();
    }
}
