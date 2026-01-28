document.querySelectorAll(".slider").forEach((slider) => {
    const track = slider.querySelector(".slider__track");
    const left = slider.querySelector(".slider__arrow--left");
    const right = slider.querySelector(".slider__arrow--right");

    if (left) {
        left.addEventListener("click", () => {
            track.scrollBy({ left: -280, behavior: "smooth" });
        });
    }

    if (right) {
        right.addEventListener("click", () => {
            track.scrollBy({ left: 280, behavior: "smooth" });
        });
    }
});

document.querySelectorAll(".faq__question").forEach((question) => {
    question.addEventListener("click", () => {
        question.parentElement.classList.toggle("faq__item--active");
    });
});
