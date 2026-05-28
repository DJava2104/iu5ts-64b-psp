export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return (
            `
                <div class="product-detail-card">
                    <div class="product-detail-description">
                        <h3>${data.title}</h3>
                        <p>${data.text}</p>
                    </div>
                    <div class="product-detail-image">
                        <img src="${data.src}" alt="${data.title}">
                    </div>
                </div>
            `
        );
    }

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}
