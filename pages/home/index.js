import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";

const API_BASE = 'http://localhost:3000';

export class HomePage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return (
            `
                <div id="main-page" class="cards-grid"></div>
            `
        );
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;

        const productPage = new ProductPage(this.parent, cardId);
        productPage.render();
    }

    async render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        try {
            const response = await fetch(`${API_BASE}/stocks`);
            const data = await response.json();
            data.forEach((item) => {
                const productCard = new ProductCardComponent(this.pageRoot);
                productCard.render(item, this.clickCard.bind(this));
            });
        } catch (err) {
            console.error('Ошибка загрузки данных:', err);
        }
    }
}
