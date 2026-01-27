// Слайдер герой-блока

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
