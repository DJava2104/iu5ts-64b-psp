import { BackButtonComponent } from "../../components/back-button/index.js";
import { ProductComponent } from "../../components/product/index.js";
import { HomePage } from "../home/index.js";

const API_BASE = 'http://localhost:3000';

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return (
            `
                <div id="product-page"></div>
            `
        );
    }

    clickBack() {
        const homePage = new HomePage(this.parent);
        homePage.render();
    }

    async render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        try {
            const response = await fetch(`${API_BASE}/stocks/${this.id}`);
            if (!response.ok) return;
            const data = await response.json();
            const product = new ProductComponent(this.pageRoot);
            product.render(data);
        } catch (err) {
            console.error('Ошибка загрузки данных:', err);
        }
    }
}
