document.addEventListener('DOMContentLoaded', function() {
    // Elementy menu mobilnego
    const menuToggle = document.querySelector('.main-nav__menu-toggle');
    const menuWrapper = document.querySelector('.main-nav__menu-wrapper');
    const closeMenu = document.querySelector('.main-nav__close');
    const overlay = document.querySelector('.main-nav__overlay');
    const menuLinks = document.querySelectorAll('.main-nav__menu a');
    
    // Funkcja otwierająca menu
    function openMenu() {
      menuWrapper.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Zapobiega przewijaniu strony
    }
    
    // Funkcja zamykająca menu
    function closeMenuFunction() {
      menuWrapper.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = ''; // Przywraca przewijanie strony
    }
    
    // Nasłuchiwanie zdarzeń
    if (menuToggle) {
      menuToggle.addEventListener('click', openMenu);
    }
    
    if (closeMenu) {
      closeMenu.addEventListener('click', closeMenuFunction);
    }
    
    if (overlay) {
      overlay.addEventListener('click', closeMenuFunction);
    }
    
    // Zamykanie menu po kliknięciu w link
    menuLinks.forEach(link => {
      link.addEventListener('click', closeMenuFunction);
    });
    
    // Obsługa zmiany rozmiaru okna
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) { // Wartość dostosowana do twojego breakpointu md
        closeMenuFunction();
      }
    });
  });
