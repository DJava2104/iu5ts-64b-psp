export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return (
            `
                <div class="card">
                    <div class="card-image">
                        <img src="${data.src}" alt="${data.title}">
                    </div>
                    <h2 class="card-title">${data.title}</h2>
                    <p class="card-text">${data.text}</p>
                    <button class="card-btn" id="click-card-${data.id}" data-id="${data.id}">Подробнее →</button>
                </div>
            `
        )
    }

    addListeners(data, listener) {
        document
            .getElementById(`click-card-${data.id}`)
            .addEventListener("click", listener)
    }

    render(data, listener) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(data, listener)
    }
}
