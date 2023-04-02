import "./calculator.js";

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
