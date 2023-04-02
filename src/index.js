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

    registerServiceWorker();
});

let move = false;

containerEl.addEventListener("mousedown", (e) => {
    containerEl.style.cursor = "move";
    containerEl.style.position = "absolute";
    move = true;
});
containerEl.addEventListener("mousemove", (e) => {
    if (!move) {
        return;
    }
    const rect = containerEl.getBoundingClientRect();
    let top = `${e.screenY - rect.height / 2}`;
    let left = `${e.screenX - rect.width / 2}`;
    containerEl.style.top = top + "px";
    containerEl.style.left = left + "px";
});
containerEl.addEventListener("mouseup", (e) => {
    containerEl.style.cursor = "auto";
    containerEl.style.position = "relative";
    move = false;
});
