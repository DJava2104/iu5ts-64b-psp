export class AboutPage {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return (
            `
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
            `
        );
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}
