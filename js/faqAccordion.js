// Аккордеон FAQ

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
