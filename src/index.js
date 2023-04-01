const historyEl = document.querySelector(".history"),
    inputPanelEl = document.querySelector(".input__panel"),
    inputInfoEl = document.querySelector(".input__info"),
    buttonsContainer = document.querySelector(".buttons");

buttonsContainer.addEventListener("click", (e) => {
    const dataset = e.target.dataset;
    const value = Object.values(dataset)[0];
    if (!!value) return;
});

function updateInputEl(newData) {
    inputPanelEl.textContent = newData;
}
