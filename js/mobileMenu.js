// Управление мобильным меню

const burgerBtn = document.getElementById("burgerBtn");
const navMenu = document.getElementById("navMenu");
const navOverlay = document.getElementById("navOverlay");

// Функция переключения меню
function toggleMobileMenu() {
    const isActive = navMenu.classList.contains("nav--active");

    if (isActive) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

// Функция открытия меню
function openMobileMenu() {
    navMenu.classList.add("nav--active");
    navOverlay.classList.add("nav-overlay--active");
    burgerBtn.classList.add("burger--open");
    document.body.style.overflow = "hidden";
}

// Функция закрытия меню
function closeMobileMenu() {
    navMenu.classList.remove("nav--active");
    navOverlay.classList.remove("nav-overlay--active");
    burgerBtn.classList.remove("burger--open");
    document.body.style.overflow = "";
}

// Обработчик клика на кнопку меню
burgerBtn.addEventListener("click", toggleMobileMenu);

// Обработчик клика на оверлей
navOverlay.addEventListener("click", closeMobileMenu);

// Обработчик клика на ссылки в меню
document.querySelectorAll(".nav__link, .btn--primary").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
});

// Обработчик клика по логотипу
document.getElementById("logoLink").addEventListener("click", function (e) {
    e.preventDefault();
    closeMobileMenu();
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});
