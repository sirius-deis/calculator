const historyEl = document.querySelector(".history"),
    inputPanelEl = document.querySelector(".input__panel"),
    inputInfoEl = document.querySelector(".input__info"),
    buttonsContainer = document.querySelector(".buttons");

let data = "";

buttonsContainer.addEventListener("click", (e) => {
    const el = e.target;
    const dataset = Object.values(el.dataset)[0];
    if (!dataset) return;
    if (dataset === "number" || dataset === "parentheses" || dataset === "sign") {
        updateData(el.textContent);
    }
    if (dataset === "clear") {
        data = data.slice(0, -1);
    }
    if (dataset === "comma") {
        updateData(el.textContent);
    }
    if (dataset === "equal") {
        console.log("equal");
    }

    updateInputEl();
});

function updateData(value) {
    data += value;
}

function updateInputEl() {
    inputPanelEl.textContent = data;
}
