import "./calculator.js";

const containerEl = document.querySelector(".container");

document.addEventListener("DOMContentLoaded", () => {
    const registerServiceWorker = async () => {
        if ("serviceWorker" in navigator) {
            try {
                const registration = await navigator.serviceWorker.register("./sw.js", { scope: "/src/" });

                if (registration.installing) {
                    console.log("Service worker is installing");
                } else if (registration.waiting) {
                    console.log("Service worker is installed");
                } else if (registration.active) {
                    console.log("Service worker is active");
                }
            } catch (error) {
                console.error(`Registration failed with ${error}`);
            }
        }
    };

    //registerServiceWorker();
});

let move = false;
let y, x;

containerEl.addEventListener("mousedown", (e) => {
    if (e.which !== 1) {
        return;
    }
    if (e.target.closest(".button")) {
        return;
    }
    if (e.target.closest(".history__line")) {
        return;
    }
    if (e.target.closest(".input")) {
        return;
    }
    y = containerEl.offsetTop - e.clientY;
    x = containerEl.offsetLeft - e.clientX;
    move = true;
    containerEl.style.cursor = "move";
    containerEl.style.position = "absolute";
});
containerEl.addEventListener("mousemove", (e) => {
    if (!move) {
        return;
    }
    containerEl.style.top = e.clientY + y + "px";
    containerEl.style.left = e.clientX + x + "px";
});
containerEl.addEventListener("mouseup", (e) => {
    containerEl.style.cursor = "auto";
    containerEl.style.position = "relative";
    move = false;
});
