import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";

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

    getData() {
        return [
            {
                id: 1,
                src: "https://cover.imglib.info/uploads/cover/jujutsu-kaisen/cover/f28e26bf-9aa3-4ad4-adb7-9b6e60a9e05d_orig.jpg",
                title: "Магическая битва",
                text: "История о старшекласснике Юдзи Итадори, который случайно становится обладателем могущественного проклятия и вступает в мир магических битв.",
                detailText: "Магическая битва (Jujutsu Kaisen) — популярное аниме о мире проклятий и магов. Юдзи Итадори, съев палец короля проклятий Сукуны, становится его сосудом и вступает в школу магии, чтобы сражаться с проклятиями и защищать людей. Серия славится динамичными боями и глубокими персонажами."
            },
            {
                id: 2,
                src: "https://cover.imglib.info/uploads/cover/kimetsu-no-yaiba/cover/64b6c590-53b6-453e-9612-f2b48085e296_orig.jpg",
                title: "Клинок, рассекающий демонов",
                text: "История о мальчике Тандзиро, чья семья была убита демонами, а сестра превращена в демона. Он становится охотником на демонов, чтобы найти лекарство для сестры.",
                detailText: "Клинок, рассекающий демонов (Kimetsu no Yaiba) — популярное аниме о приключениях Тандзиро Камадо, который после трагедии в семье вступает в отряд истребителей демонов. Вместе с сестрой Нэдзуко он сражается с могущественными демонами и ищет способ вернуть ей человеческий облик."
            },
            {
                id: 3,
                src: "https://cover.imglib.info/uploads/cover/gachiakuta/cover/73ea918f-da28-4257-8005-0c2dc9fbe9e1_orig.jpg",
                title: "Гачи",
                text: "Мальчик по имени Рудо живёт в трущобах и мечтает попасть в элитный район. Однажды его жизнь меняется, когда он находит загадочный артефакт.",
                detailText: "Гачи (Gachiakuta) — манга и аниме о парне по имени Рудо, который живёт в мире, разделённом на классы. После несправедливого обвинения он оказывается в опасном мире, где выживают сильнейшие. Ему предстоит раскрыть тайны своего прошлого и найти своё место в этом жестоком мире."
            }
        ];
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;

        const productPage = new ProductPage(this.parent, cardId);
        productPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const data = this.getData();
        data.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot);
            productCard.render(item, this.clickCard.bind(this));
        });
    }
}
