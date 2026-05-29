import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";

export class HomePage {
    constructor(parent) {
        this.parent = parent;
        this.allData = [];
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return (
            `
                <div class="home-controls">
                    <input type="text" id="filter-title" class="home-input" placeholder="Фильтр по названию..." />
                    <button id="search-btn" class="home-btn-clear">Поиск</button>
                    <div class="pagination-control">
                        <label for="max-cards">Макс. карточек:</label>
                        <input type="number" id="max-cards" class="home-input pagination-input" value="3" min="1" max="50" />
                    </div>
                    <button id="clear-btn" class="home-btn-clear">Очистить</button>
                </div>
                <div id="main-page" class="cards-grid"></div>
            `
        );
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;

        const productPage = new ProductPage(this.parent, cardId);
        productPage.render();
    }

    getData() {
        ajax.get(stockUrls.getStocks(), (data) => {
            this.allData = data;
            this.renderData();
        });
    }

    renderData() {
        this.pageRoot.innerHTML = '';

        const filterValue = document.getElementById('filter-title').value.toLowerCase();
        const maxCards = parseInt(document.getElementById('max-cards').value) || 10;

        const filtered = this.allData.filter(item =>
            item.title.toLowerCase().includes(filterValue)
        );

        const items = filtered.slice(0, maxCards);

        items.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot);
            productCard.render(item, this.clickCard.bind(this));
        });
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        document.getElementById('filter-title').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.renderData();
            }
        });

        document.getElementById('search-btn').addEventListener('click', () => {
            this.renderData();
        });

        document.getElementById('max-cards').addEventListener('input', () => {
            this.renderData();
        });

        document.getElementById('clear-btn').addEventListener('click', () => {
            document.getElementById('filter-title').value = '';
            document.getElementById('max-cards').value = '3';
            this.renderData();
        });

        this.getData();
    }
}
