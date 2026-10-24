
import { animate } from "https://cdn.jsdelivr.net/npm/motion@12.23.12/+esm";

const card = document.querySelector("#led-card");
const year = document.querySelector("#year");

// Automatically update copyright year
if (year) {
    year.textContent = new Date().getFullYear();
}

// Interactive 3D card tilt
if (
    card &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
    let activeAnimation;

    function resetCard() {
        activeAnimation?.stop();

        activeAnimation = animate(
            card,
            {
                rotateX: 0,
                rotateY: 0,
                z: 0,
                scale: 1
            },
            {
                type: "spring",
                visualDuration: 0.4,
                bounce: 0.12
            }
        );
    }

    function tiltCard(event) {
        const rect = card.getBoundingClientRect();

        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;

        const rotateY = (x - 0.5) * 16;
        const rotateX = (0.5 - y) * 12;

        activeAnimation?.stop();

        activeAnimation = animate(
            card,
            {
                rotateX,
                rotateY,
                z: 18,
                scale: 1.025
            },
            {
                type: "spring",
                visualDuration: 0.35,
                bounce: 0.12
            }
        );
    }

    card.addEventListener("pointermove", (event) => {
        if (event.pointerType === "touch") return;
        tiltCard(event);
    });

    card.addEventListener("pointerleave", resetCard);
    card.addEventListener("blur", resetCard);

    card.addEventListener("focus", () => {
        activeAnimation?.stop();

        activeAnimation = animate(
            card,
            {
                rotateY: -4,
                rotateX: 2,
                z: 8,
                scale: 1.01
            },
            {
                type: "spring",
                visualDuration: 0.4,
                bounce: 0.1
            }
        );
    });
}
