// Утилиты и обновление года

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
