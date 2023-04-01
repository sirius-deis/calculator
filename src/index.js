const historyEl = document.querySelector(".history"),
    inputPanelEl = document.querySelector(".input__panel"),
    inputInfoEl = document.querySelector(".input__info"),
    buttonsContainer = document.querySelector(".buttons");

let data = "";

buttonsContainer.addEventListener("click", (e) => {
    const el = e.target;
    const dataset = Object.values(el.dataset)[0];
    if (!dataset) return;
    if (
        dataset === "number" ||
        dataset === "parentheses" ||
        dataset === "sign" ||
        dataset === "pi" ||
        dataset === "root"
    ) {
        updateData(el.textContent);
    }
    if (dataset === "percent" || dataset === "mod") {
        if (!checkIfNumberBeforePresent()) {
            return;
        }
        updateData(el.textContent);
    }
    if (dataset === "clear") {
        if (data.lastIndexOf("**2")) {
            data = data.slice(0, -3);
        } else {
            data = data.slice(0, -1);
        }
    }
    if (dataset === "comma") {
        updateData(el.textContent);
    }
    if (dataset === "**") {
        updateData("**2");
    }
    if (dataset === "equal") {
        console.log("equal");
    }

    updateInputEl();
});

function checkIfNumberBeforePresent() {
    if (data.includes("**2") && data.lastIndexOf("**2") === data.length - 3) {
        return false;
    }
    if (typeof +data[data.length - 1] === "number" && isNaN(+data[data.length - 1])) {
        return false;
    }
    return true;
}

function updateData(value) {
    data += value;
}

function updateInputEl() {
    let dataForInsert = data;
    if (dataForInsert.includes("**2")) {
        dataForInsert = dataForInsert.replaceAll("**2", "<sup>2</sup>");
    }
    inputPanelEl.innerHTML = dataForInsert;
}
