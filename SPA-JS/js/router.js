let pageUrls = {
    about: '/index.html?about',
    contact: '/index.html?contact',
    gallery: '/index.html?gallery',
    home: '/index.html'
};

function OnStartUp() {
    popStateHandler();
}

OnStartUp();

document.querySelector('#about-link').addEventListener('click', (event) => {
    let stateObj = { page: 'about' };
    document.title = 'About';
    history.pushState(stateObj, "about", "?about");
    RenderAboutPage();
});

document.querySelector('#contact-link').addEventListener('click', (event) => {
    let stateObj = { page: 'contact' };
    document.title = 'Contact';
    history.pushState(stateObj, "contact", "?contact");
    RenderContactPage();
});

document.querySelector('#gallery-link').addEventListener('click', () => {
    let stateObj = { page: 'gallery' };
    document.title = 'Gallery';
    history.pushState(stateObj, "gallery", "?gallery");
    RenderGalleryPage();
});


document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
})

function RenderAboutPage() {
    document.querySelector('main').innerHTML = `
    <section class="page-header">
    <div class="page-header__content">
        <h1>O mnie</h1>
        <p>Poznaj moją historię i doświadczenie</p>
    </div>
</section>

<section class="about-page">
    <div class="about-page__container">
        <div class="about-page__content">
            <h2>Moja historia</h2>
            <p>Jestem pasjonatem technologii i programowania od dziecka. Swoją przygodę z tworzeniem stron internetowych rozpocząłem jeszcze w szkole średniej, eksperymentując z HTML i CSS.</p>
            <p>Po ukończeniu studiów informatycznych na Politechnice Wrocławskiej, pracowałem dla kilku firm z branży IT, zdobywając cenne doświadczenie w różnorodnych projektach.</p>
            <p>Obecnie działam jako niezależny developer, oferując kompleksowe usługi tworzenia stron internetowych i aplikacji webowych.</p>
            <br>
            <h2>Moje podejście</h2>
            <p>Wierzę, że dobra strona internetowa to połączenie estetycznego designu, intuicyjnej nawigacji i wydajnego kodu. Każdy projekt traktuję indywidualnie, dopasowując rozwiązania do potrzeb i oczekiwań klienta.</p>
            <p>Stawiam na jakość, terminowość i pełne zadowolenie klienta. Dbam o szczegóły i regularnie poszerzam swoją wiedzę, aby oferować najnowocześniejsze rozwiązania.</p>
            <br>
            <h2>Edukacja i certyfikaty</h2>
            <ul class="about-page__list">
                <li>Inżynier Informatyki - Politechnika Wrocławska</li>
                <li>Magister Informatyki Stosowanej - Politechnika Wrocławska</li>
                <li>Certyfikat React Developer - Meta</li>
                <li>Certyfikat Node.js Developer - OpenJS Foundation</li>
            </ul>
        </div>
        
        <div class="about-page__timeline">
            <h2>Moja droga zawodowa</h2>
            <div class="timeline">
                <div class="timeline__item">
                    <div class="timeline__item-date">2018</div>
                    <div class="timeline__item-content">
                        <h3>Początek kariery</h3>
                        <p>Rozpocząłem pracę jako Junior Frontend Developer w firmie XYZ.</p>
                    </div>
                </div>
                <div class="timeline__item">
                    <div class="timeline__item-date">2019</div>
                    <div class="timeline__item-content">
                        <h3>Pierwszy duży projekt</h3>
                        <p>Odpowiedzialny za stworzenie platformy e-commerce dla firmy z branży modowej.</p>
                    </div>
                </div>
                <div class="timeline__item">
                    <div class="timeline__item-date">2020</div>
                    <div class="timeline__item-content">
                        <h3>Awans na stanowisko Mid Developer</h3>
                        <p>Rozszerzenie zakresu umiejętności o Node.js i MongoDB.</p>
                    </div>
                </div>
                <div class="timeline__item">
                    <div class="timeline__item-date">2021</div>
                    <div class="timeline__item-content">
                        <h3>Zmiana pracy</h3>
                        <p>Dołączenie do zespołu deweloperów w startupie technologicznym.</p>
                    </div>
                </div>
                <div class="timeline__item">
                    <div class="timeline__item-date">2022</div>
                    <div class="timeline__item-content">
                        <h3>Działalność freelancerska</h3>
                        <p>Rozpoczęcie własnej działalności jako niezależny developer.</p>
                    </div>
                </div>
                <div class="timeline__item">
                    <div class="timeline__item-date">Obecnie</div>
                    <div class="timeline__item-content">
                        <h3>Ciągły rozwój</h3>
                        <p>Realizacja projektów dla klientów z różnych branż i nieustanne poszerzanie umiejętności.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

    `;
}

function RenderContactPage() {
    document.querySelector('main').innerHTML = `

<section class="page-header">
    <div class="page-header__content">
        <h1>Skontaktuj się ze mną</h1>
        <p>Chętnie odpowiem na Twoje pytania</p>
    </div>
</section>

<section class="contact">
    <div class="contact__container">
        <div class="contact__info">
            <h2>Informacje kontaktowe</h2>
            <p>Skorzystaj z poniższego formularza lub skontaktuj się ze mną bezpośrednio:</p>
            <ul class="contact__info-list">
                <li><i class="fas fa-map-marker-alt"></i> Wrocław, Polska</li>
                <li><i class="fas fa-phone"></i> +48 123 456 789</li>
                <li><i class="fas fa-envelope"></i> kontakt@jankowalski.pl</li>
            </ul>
            <div class="contact__info-social">
                <a href=""><i class="fab fa-facebook-f"></i></a>
                <a href=""><i class="fab fa-twitter"></i></a>
                <a href=""><i class="fab fa-instagram"></i></a>
                <a href=""><i class="fab fa-linkedin-in"></i></a>
                <a href=""><i class="fab fa-github"></i></a>
            </div>
        </div>
        
        <div class="contact__form-container">
            <h2>Wyślij wiadomość</h2>
            <form class="contact__form" action="/submit-form" method="POST">
                <div class="form-group">
                    <label for="name">Twoje imię</label>
                    <input type="text" id="name" name="name" placeholder="Imię i nazwisko" required>
                </div>
                <div class="form-group">
                    <label for="email">Twój email</label>
                    <input type="email" id="email" name="email" placeholder="Adres email" required>
                </div>
                <div class="form-group">
                    <label for="message">Treść wiadomości</label>
                    <textarea id="message" name="message" placeholder="Twoja wiadomość" required></textarea>
                </div>

                <div class="g-recaptcha" data-sitekey="YOUR_SITE_KEY"></div>

                <button type="submit" class="button button--primary">Wyślij wiadomość</button>
            </form>
        </div>
    </div>
</section>
    `;

    setTimeout(() => {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', handleContactFormSubmit);
        }
    }, 100);

}

function RenderGalleryPage() {
    document.querySelector('main').innerHTML = `
        <section class="page-header">
            <div class="page-header__content">
                <h1>Galeria projektów</h1>
                <p>Przegląd moich najlepszych realizacji</p>
            </div>
        </section>

        <section class="gallery">
        <div class="gallery__container">
        <h2 class="section-title">Moje Projekty</h2>
        <div id="gallery" class="gallery-grid"></div>
        <div id="modal" class="modal hidden">
            <div class="modal-content">
                <span id="close-modal" class="close-button">&times;</span>
                <img id="modal-image" src="" alt="Large view">
            </div>
        </div>
        </div>
        </section>
    `;

    setTimeout(() => {
        loadGalleryImages();
        setupGalleryEvents();
    }, 100);

}


function popStateHandler() {
    const url = new URL(window.location.href);
    const params = url.search;
    
    if (params === '?about') {
        document.title = 'About';
        RenderAboutPage();
    } else if (params === '?contact') {
        document.title = 'Contact';
        RenderContactPage();
    } else if (params === '?gallery') {
        document.title = 'Gallery';
        RenderGalleryPage();
    }
}

// window.onpopstate = popStateHandler;
window.addEventListener('popstate', popStateHandler)
