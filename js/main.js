// ========================================
// ИМПОРТЫ МОДУЛЕЙ
// ========================================

import "./wheelFortune.js";

// ========================================
// УПРАВЛЕНИЕ МОБИЛЬНЫМ МЕНЮ
// ========================================

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

// ========================================
// СЛАЙДЕР ГЕРОЯ
// ========================================

let currentSlide = 0;
const slides = document.querySelectorAll(".hero__slide");
const dots = document.querySelectorAll(".hero__slider-dot");

function showSlide(n) {
    // Скрываем все слайды
    slides.forEach((slide) => slide.classList.remove("hero__slide--active"));
    dots.forEach((dot) => dot.classList.remove("hero__slider-dot--active"));

    // Показываем нужный слайд
    slides[n].classList.add("hero__slide--active");
    dots[n].classList.add("hero__slider-dot--active");
    currentSlide = n;
}

// Следующий слайд
document
    .querySelector(".hero__arrow--right")
    .addEventListener("click", function () {
        let nextSlide = (currentSlide + 1) % slides.length;
        showSlide(nextSlide);
    });

// Предыдущий слайд
document
    .querySelector(".hero__arrow--left")
    .addEventListener("click", function () {
        let prevSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevSlide);
    });

// Клик по точкам
dots.forEach((dot, index) => {
    dot.addEventListener("click", function () {
        showSlide(index);
    });
});

// Автопрокрутка слайдов
setInterval(function () {
    let nextSlide = (currentSlide + 1) % slides.length;
    showSlide(nextSlide);
}, 5000);

// ========================================
// АККОРДЕОН FAQ
// ========================================

document.querySelectorAll(".faq__question").forEach((question) => {
    question.addEventListener("click", () => {
        const answer = question.nextElementSibling;
        const isOpen = answer.classList.contains("faq__answer--open");

        // Закрываем все ответы
        document.querySelectorAll(".faq__answer").forEach((item) => {
            item.classList.remove("faq__answer--open");
        });
        document.querySelectorAll(".faq__question").forEach((item) => {
            item.classList.remove("faq__question--active");
        });

        // Если ответ был закрыт, открываем его
        if (!isOpen) {
            answer.classList.add("faq__answer--open");
            question.classList.add("faq__question--active");
        }
    });
});

// ========================================
// НАВИГАЦИЯ И ПЛАВНАЯ ПРОКРУТКА
// ========================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        if (targetId === "#") return;

        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: "smooth",
            });
        }
    });
});

// ========================================
// УТИЛИТЫ
// ========================================

document.addEventListener("DOMContentLoaded", function () {
    const yearElements = document.querySelectorAll(".footer__disclaimer");
    yearElements.forEach((element) => {
        if (element.textContent.includes("2023")) {
            element.textContent = element.textContent.replace(
                "2023",
                new Date().getFullYear(),
            );
        }
    });
});
