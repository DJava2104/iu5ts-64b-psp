(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=class{constructor(e){this.parent=e}getHTML(e){return`
                <div class="card">
                    <div class="card-image">
                        <img src="${e.src}" alt="${e.title}">
                    </div>
                    <h2 class="card-title">${e.title}</h2>
                    <p class="card-text">${e.text}</p>
                    <button class="card-btn" id="click-card-${e.id}" data-id="${e.id}">Подробнее →</button>
                </div>
            `}addListeners(e,t){document.getElementById(`click-card-${e.id}`).addEventListener(`click`,t)}render(e,t){let n=this.getHTML(e);this.parent.insertAdjacentHTML(`beforeend`,n),this.addListeners(e,t)}},t=class{constructor(e){this.parent=e}addListeners(e){document.getElementById(`back-button`).addEventListener(`click`,e)}getHTML(){return`
                <div class="back-to-home">
                    <button id="back-button" class="home-btn" type="button"><span>←</span> Назад</button>
                </div>
            `}render(e){let t=this.getHTML();this.parent.insertAdjacentHTML(`beforeend`,t),this.addListeners(e)}},n=class{constructor(e){this.parent=e}getHTML(e){return`
                <div class="product-detail-card">
                    <div class="product-detail-description">
                        <h3>${e.title}</h3>
                        <p>${e.text}</p>
                    </div>
                    <div class="product-detail-image">
                        <img src="${e.src}" alt="${e.title}">
                    </div>
                </div>
            `}render(e){let t=this.getHTML(e);this.parent.insertAdjacentHTML(`beforeend`,t)}},r=new class{async get(e){let t=await fetch(e);if(!t.ok)throw Error(`HTTP error! status: ${t.status}`);return t.json()}async post(e,t){let n=await fetch(e,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)});if(!n.ok)throw Error(`HTTP error! status: ${n.status}`);return n.json()}async patch(e,t){let n=await fetch(e,{method:`PATCH`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)});if(!n.ok)throw Error(`HTTP error! status: ${n.status}`);return n.json()}async delete(e){let t=await fetch(e,{method:`DELETE`});if(!t.ok)throw Error(`HTTP error! status: ${t.status}`);return t.status===204?null:t.json()}},i=new class{constructor(){this.baseUrl=`http://localhost:3000`}getStocks(e){let t=`${this.baseUrl}/stocks`;return e?`${t}?title=${encodeURIComponent(e)}`:t}getStockById(e){return`${this.baseUrl}/stocks/${e}`}createStock(){return`${this.baseUrl}/stocks`}removeStockById(e){return`${this.baseUrl}/stocks/${e}`}updateStockById(e){return`${this.baseUrl}/stocks/${e}`}},a=class{constructor(e,t){this.parent=e,this.id=t}get pageRoot(){return document.getElementById(`product-page`)}getHTML(){return`
                <div id="product-page"></div>
            `}clickBack(){new o(this.parent).render()}async getData(){try{let e=await r.get(i.getStockById(this.id));this.renderData(e)}catch(e){console.error(`Ошибка загрузки данных:`,e)}}renderData(e){new n(this.pageRoot).render(e)}render(){this.parent.innerHTML=``;let e=this.getHTML();this.parent.insertAdjacentHTML(`beforeend`,e),new t(this.pageRoot).render(this.clickBack.bind(this)),this.getData()}},o=class{constructor(e){this.parent=e,this.allData=[]}get pageRoot(){return document.getElementById(`main-page`)}getHTML(){return`
                <div class="home-controls">
                    <input type="text" id="filter-title" class="home-input" placeholder="Фильтр по названию..." />
                    <div class="pagination-control">
                        <label for="max-cards">Макс. карточек:</label>
                        <input type="number" id="max-cards" class="home-input pagination-input" value="3" min="1" max="50" />
                    </div>
                </div>
                <div id="main-page" class="cards-grid"></div>
            `}clickCard(e){let t=e.target.dataset.id;new a(this.parent,t).render()}async getData(){try{this.allData=await r.get(i.getStocks()),this.renderData()}catch(e){console.error(`Ошибка загрузки данных:`,e)}}renderData(){this.pageRoot.innerHTML=``;let t=document.getElementById(`filter-title`).value.toLowerCase(),n=parseInt(document.getElementById(`max-cards`).value)||10;this.allData.filter(e=>e.title.toLowerCase().includes(t)).slice(0,n).forEach(t=>{new e(this.pageRoot).render(t,this.clickCard.bind(this))})}render(){this.parent.innerHTML=``;let e=this.getHTML();this.parent.insertAdjacentHTML(`beforeend`,e),document.getElementById(`filter-title`).addEventListener(`input`,()=>{this.renderData()}),document.getElementById(`max-cards`).addEventListener(`input`,()=>{this.renderData()}),this.getData()}},s=class{constructor(e){this.parent=e}getHTML(){return`
                <div class="container">
                    <h1 class="page-title" style="color: white;">Обо мне</h1>

                    <div class="profile-card">
                        <div class="profile-avatar">
                            <img src="djava.png" alt="Аватар" class="avatar-img">
                        </div>
                        <div class="profile-info">
                            <h2>Тошниёзов Жавохирбек Голибжон угли</h2>
                            <p class="profile-group">Группа: ИУ5Ц-64Б</p>
                            <p class="profile-bio">Студент, увлекающийся веб-разработкой и созданием интерактивных интерфейсов. Этот проект - лабораторная работа по основам HTML и CSS.</p>
                        </div>
                    </div>

                    <div class="details-section">
                        <details class="about-details">
                            <summary>📚 Образование</summary>
                            <div class="details-content">
                                <p><strong>Университет:</strong> МГТУ им Н.Э. Баумана</p>
                                <p><strong>Курс:</strong> 3-й курс</p>
                            </div>
                        </details>

                        <details class="about-details">
                            <summary>💻 Навыки</summary>
                            <div class="details-content">
                                <ul>
                                    <li>HTML</li>
                                    <li>CSS</li>
                                    <li>JavaScript</li>
                                </ul>
                            </div>
                        </details>

                        <details class="about-details">
                            <summary>🎯 Цели</summary>
                            <div class="details-content">
                                <p>Создавать полезные веб-приложения.</p>
                            </div>
                        </details>
                    </div>

                    <div class="contact-section">
                        <h2>Контакты</h2>
                        <div class="contact-grid">
                            <div class="contact-item">
                                <span class="contact-icon">📧</span>
                                <span>toshniyozovdjr@gmail.com</span>
                            </div>
                            <div class="contact-item">
                                <span class="contact-icon">📱</span>
                                <span>+7 (ХХХ) ХХХ-ХХ-ХХ</span>
                            </div>
                            <div class="contact-item">
                                <span class="contact-icon">📍</span>
                                <span>Москва</span>
                            </div>
                        </div>
                    </div>

                    <div class="back-to-home">
                        <a href="#home" class="home-btn">
                            <span>←</span> Вернуться на главную
                        </a>
                    </div>
                </div>
            `}render(){this.parent.innerHTML=``;let e=this.getHTML();this.parent.insertAdjacentHTML(`beforeend`,e)}},c=class{constructor(e){this.parent=e,this.currentValue=`0`,this.previousValue=``,this.operation=null,this.shouldResetScreen=!1,this.memoryValue=0}getHTML(){return`
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
            `}updateDisplay(){document.getElementById(`result`).textContent=this.currentValue}appendNumber(e){this.currentValue===`0`||this.shouldResetScreen?(this.currentValue=e,this.shouldResetScreen=!1):this.currentValue+=e,this.updateDisplay()}appendThreeZeros(){this.currentValue===`0`||this.shouldResetScreen?(this.currentValue=`000`,this.shouldResetScreen=!1):this.currentValue+=`000`,this.updateDisplay()}appendDot(){if(this.shouldResetScreen){this.currentValue=`0.`,this.shouldResetScreen=!1,this.updateDisplay();return}this.currentValue.includes(`.`)||(this.currentValue+=`.`,this.updateDisplay())}clearScreen(){this.currentValue=`0`,this.previousValue=``,this.operation=null,this.updateDisplay()}backspace(){this.currentValue.length>1?this.currentValue=this.currentValue.slice(0,-1):this.currentValue=`0`,this.updateDisplay()}percent(){this.currentValue=(parseFloat(this.currentValue)/100).toString(),this.updateDisplay()}sqrt(){let e=parseFloat(this.currentValue);if(e<0){alert(`Нельзя извлечь корень из отрицательного числа!`);return}this.currentValue=Math.sqrt(e).toString(),this.shouldResetScreen=!0,this.updateDisplay()}square(){let e=parseFloat(this.currentValue);this.currentValue=(e*e).toString(),this.shouldResetScreen=!0,this.updateDisplay()}cube(){let e=parseFloat(this.currentValue);this.currentValue=(e*e*e).toString(),this.shouldResetScreen=!0,this.updateDisplay()}factorial(){let e=parseFloat(this.currentValue);if(e<0||!Number.isInteger(e)){alert(`Факториал только для целых неотрицательных чисел!`);return}let t=1;for(let n=2;n<=e;n++)t*=n;this.currentValue=t.toString(),this.shouldResetScreen=!0,this.updateDisplay()}memAdd(){this.memoryValue+=parseFloat(this.currentValue),this.currentValue=`0`,this.shouldResetScreen=!0,this.updateDisplay()}memSub(){this.memoryValue-=parseFloat(this.currentValue),this.currentValue=`0`,this.shouldResetScreen=!0,this.updateDisplay()}chooseOperation(e){this.currentValue!==``&&(this.previousValue!==``&&this.calculate(),this.operation=e,this.previousValue=this.currentValue,this.shouldResetScreen=!0)}calculate(){if(this.operation===null||this.previousValue===``||this.currentValue===``)return;let e,t=parseFloat(this.previousValue),n=parseFloat(this.currentValue);switch(this.operation){case`+`:e=t+n;break;case`-`:e=t-n;break;case`x`:e=t*n;break;case`/`:if(n===0){alert(`На ноль делить нельзя!`),this.clearScreen();return}e=t/n;break;default:return}this.currentValue=e.toString(),this.operation=null,this.previousValue=``,this.shouldResetScreen=!0;let r=Math.random()*360;document.querySelector(`.result`).style.backgroundColor=`hsl(${r}, 100%, 50%)`,this.updateDisplay()}addListeners(){document.querySelectorAll(`[id^="btn_digit_"]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.textContent;this.appendNumber(t)})}),document.getElementById(`btn_digit_000`).addEventListener(`click`,()=>this.appendThreeZeros()),document.getElementById(`btn_digit_dot`).addEventListener(`click`,()=>this.appendDot()),document.getElementById(`btn_op_clear`).addEventListener(`click`,()=>this.clearScreen()),document.getElementById(`btn_op_backspace`).addEventListener(`click`,()=>this.backspace()),document.getElementById(`btn_op_percent`).addEventListener(`click`,()=>this.percent()),document.getElementById(`btn_op_sqrt`).addEventListener(`click`,()=>this.sqrt()),document.getElementById(`btn_op_square`).addEventListener(`click`,()=>this.square()),document.getElementById(`btn_op_cube`).addEventListener(`click`,()=>this.cube()),document.getElementById(`btn_op_factorial`).addEventListener(`click`,()=>this.factorial()),document.getElementById(`btn_op_mem_add`).addEventListener(`click`,()=>this.memAdd()),document.getElementById(`btn_op_mem_sub`).addEventListener(`click`,()=>this.memSub()),document.querySelectorAll(`[id^="btn_op_"]:not(#btn_op_clear):not(#btn_op_backspace):not(#btn_op_percent):not(#btn_op_sqrt):not(#btn_op_square):not(#btn_op_cube):not(#btn_op_factorial):not(#btn_op_mem_add):not(#btn_op_mem_sub):not(#btn_op_equal)`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.textContent;this.chooseOperation(t)})}),document.getElementById(`btn_op_equal`).addEventListener(`click`,()=>this.calculate()),document.addEventListener(`keydown`,e=>{if(e.key>=`0`&&e.key<=`9`)this.appendNumber(e.key);else if(e.key===`.`)this.appendDot();else if(e.key===`+`||e.key===`-`||e.key===`*`||e.key===`/`){let t=e.key;t===`*`&&(t=`x`),this.chooseOperation(t)}else e.key===`Enter`||e.key===`=`?(e.preventDefault(),this.calculate()):e.key===`Escape`?this.clearScreen():e.key===`Backspace`&&(e.preventDefault(),this.backspace())})}render(){this.parent.innerHTML=``;let e=this.getHTML();this.parent.insertAdjacentHTML(`beforeend`,e),this.updateDisplay(),this.addListeners()}},l=document.getElementById(`root`);function u(){let e=window.location.hash||`#home`;document.querySelectorAll(`.nav-link`).forEach(e=>{e.classList.remove(`active`)});let t=document.querySelector(`.nav-link[href="${e}"]`);switch(t&&t.classList.add(`active`),e){case`#home`:new o(l).render();break;case`#about`:new s(l).render();break;case`#calculator`:new c(l).render();break;default:new o(l).render()}}window.addEventListener(`hashchange`,u),window.addEventListener(`load`,u);