class WheelOfFortune {
    constructor() {
        this.prizes = [
            "Try Again",
            "Cash Bonus",
            "Crypto Boost",
            "Lucky Coin",
            "Live Casino Chip",
            "Free Spins",
            "Try Again",
            "Cash Bonus",
            "Crypto Boost",
            "Lucky Coin",
            "Live Casino Chip",
            "Free Spins",
        ];

        this.max = this.prizes.length;
        this.radius = 360 / this.max;

        this.isSpinning = false;
        this.hasSpun = false;
        this.currentRotation = 0;

        this.studs = [];
        this.activeStudIndex = 0;
        this.animationInterval = null;
        this.closeTimeout = null;

        this.wheelInner = document.getElementById("wheelInner");
        this.wheelStuds = document.getElementById("wheelStuds");
        this.spinButton = document.getElementById("spinButton");

        this.popup = document.getElementById("popup");
        this.popupOverlay = document.getElementById("popupOverlay");
        this.popupClose = document.getElementById("popupClose");
        this.popupPrize = document.getElementById("popupPrize");
        this.closePopupButton = document.getElementById("closePopup");

        // 🔥 АНТИ-ТРЯСКА: создаём внутренний слой, который будем крутить
        this.rotator = document.createElement("div");
        this.rotator.style.width = "100%";
        this.rotator.style.height = "100%";
        this.rotator.style.position = "absolute";
        this.rotator.style.top = "0";
        this.rotator.style.left = "0";
        this.rotator.style.transformOrigin = "50% 50%";
        this.rotator.style.willChange = "transform";

        while (this.wheelInner.firstChild) {
            this.rotator.appendChild(this.wheelInner.firstChild);
        }
        this.wheelInner.appendChild(this.rotator);

        this.init();
        this.bindEvents();
    }

    init() {
        this.rotateSections();
        this.createStuds();
        this.startStudAnimation();
    }

    rotateSections() {
        const pieces = this.rotator.querySelectorAll(".wheel__piece");
        pieces.forEach((piece, index) => {
            piece.style.transform = `rotate(${index * this.radius}deg)`;
        });
    }

    createStuds() {
        const studCount = this.max * 2;
        const studAngle = 360 / studCount;

        for (let i = 0; i < studCount; i++) {
            const stud = document.createElement("div");
            stud.className = "wheel__stud";
            stud.style.transform = `rotate(${i * studAngle}deg)`;
            this.wheelStuds.appendChild(stud);
            this.studs.push(stud);
        }
    }

    startStudAnimation() {
        clearInterval(this.animationInterval);
        this.animationInterval = setInterval(() => {
            this.studs[this.activeStudIndex].classList.remove("active");
            this.activeStudIndex =
                (this.activeStudIndex - 1 + this.studs.length) %
                this.studs.length;
            this.studs[this.activeStudIndex].classList.add("active");
        }, 150);
    }

    bindEvents() {
        this.spinButton.addEventListener("click", () => this.spin());
        this.closePopupButton.addEventListener("click", () =>
            this.closePopup(),
        );
        this.popupOverlay.addEventListener("click", () => this.closePopup());
        this.popupClose.addEventListener("click", () => this.closePopup());

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && this.popup.classList.contains("active")) {
                this.closePopup();
            }
        });
    }

    spin() {
        if (this.isSpinning) return;
        if (this.hasSpun) return;

        this.isSpinning = true;
        this.spinButton.disabled = true;
        this.closePopup();
        this.popupClose.classList.remove("show");

        const fullRotations = 360 * (5 + Math.floor(Math.random() * 5));
        const randomExtra = Math.random() * 360;
        const totalRotation = -(fullRotations + randomExtra);

        this.animateWheel(totalRotation);
    }

    animateWheel(totalRotation) {
        const duration = 4000;
        const startTime = performance.now();
        const startRotation = this.currentRotation;
        const endRotation = startRotation + totalRotation;

        const animate = (time) => {
            const progress = Math.min((time - startTime) / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);

            const currentRotation =
                startRotation + (endRotation - startRotation) * easeOut;

            // 🔒 крутим ТОЛЬКО внутренний слой — wheel__inner остаётся неподвижным
            this.rotator.style.transform = `rotate(${currentRotation}deg)`;
            this.currentRotation = currentRotation;

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                this.onAnimationComplete();
            }
        };

        requestAnimationFrame(animate);
    }

    onAnimationComplete() {
        this.isSpinning = false;

        let R = this.currentRotation;
        let angleAtTop = (-R - 90) % 360;
        if (angleAtTop < 0) angleAtTop += 360;

        const prizeIndex = Math.floor(angleAtTop / this.radius) % this.max;
        const winningPrize = this.prizes[prizeIndex];

        // ✅ ФРИСПИН = можно крутить ещё раз
        if (winningPrize === "Try Again") {
            this.hasSpun = false;
            this.spinButton.disabled = false;
        } else {
            this.hasSpun = true;
        }

        this.showPopup(winningPrize);
    }

    showPopup(prize) {
        this.popupPrize.textContent = prize;
        this.popup.classList.add("active");

        clearTimeout(this.closeTimeout);
        this.closeTimeout = setTimeout(() => {
            this.popupClose.classList.add("show");
        }, 1500);
    }

    closePopup() {
        this.popup.classList.remove("active");
        this.popupClose.classList.remove("show");
        clearTimeout(this.closeTimeout);
    }

    destroy() {
        clearInterval(this.animationInterval);
        clearTimeout(this.closeTimeout);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new WheelOfFortune();
});
