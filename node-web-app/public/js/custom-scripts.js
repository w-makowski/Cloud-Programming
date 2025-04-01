document.querySelector(".main-nav__toggle").addEventListener("click", function () {
    document.querySelector(".main-nav__menu").classList.toggle("active");
});

// filtrowanie galerii
document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".gallery__filter button");
    const items = document.querySelectorAll(".gallery__item");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            // Usuwa klasę 'active' ze wszystkich przycisków
            buttons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            const filter = this.getAttribute("data-filter");

            items.forEach(item => {
                const category = item.getAttribute("data-category");

                if (filter === "all" || category === filter) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const galleryItems = document.querySelectorAll(".gallery__item img");

    // Tworzenie popupu
    const popup = document.createElement("div");
    popup.classList.add("image-popup");
    popup.innerHTML = `
        <div class="image-popup__content">
            <span class="image-popup__close">&times;</span>
            <img src="" alt="Popup Image">
        </div>
    `;
    document.body.appendChild(popup);

    const popupImage = popup.querySelector("img");
    const closeButton = popup.querySelector(".image-popup__close");

    // Obsługa kliknięcia na obrazek
    galleryItems.forEach(img => {
        img.addEventListener("click", function () {
            popupImage.src = this.src;
            popup.classList.add("active");
        });
    });

    // Zamknięcie popupu
    closeButton.addEventListener("click", function () {
        popup.classList.remove("active");
    });

    // Zamknięcie popupu po kliknięciu poza obrazkiem
    popup.addEventListener("click", function (e) {
        if (e.target === popup) {
            popup.classList.remove("active");
        }
    });
});

