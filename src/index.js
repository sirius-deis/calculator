const historyEl = document.querySelector(".history"),
    inputPanelEl = document.querySelector(".input__panel"),
    inputInfoEl = document.querySelector(".input__info"),
    buttonsContainer = document.querySelector(".buttons");

let data = "";

buttonsContainer.addEventListener("click", (e) => {
    const el = e.target.closest(".button");
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
        if (checkIfSignBeforePresent(el.textContent) || !checkIfPreviousIsNumber()) {
            return;
        }
        updateData(el.textContent);
    }
    if (dataset === "clear") {
        if (data.lastIndexOf("**2") === data.length - 3 || data.lastIndexOf("mod") === data.length - 3) {
            data.lastIndexOf("mod");
            data = data.slice(0, -3);
        } else {
            data = data.slice(0, -1);
        }
    }
    if (dataset === "comma") {
        updateData(el.textContent);
    }
    if (dataset === "**") {
        if (checkIfSignBeforePresent("**2")) {
            return;
        }
        updateData("**2");
    }
    if (dataset === "equal") {
        console.log("equal");
    }

    updateInputEl();
});

function checkIfSignBeforePresent(sign) {
    if (data.slice(data.length - sign.length) === sign) {
        return true;
    }
    return false;
}

function checkIfPreviousIsNumber() {
    if (typeof +data[data.length - 1] === "number" && !isNaN(+data[data.length - 1])) {
        return true;
    }
    return false;
}

// function checkIfNumberBeforePresent(operation) {
//     console.log(data.slice(data.length - 2).match(/\n%/));
//     if (data.slice(data.length - 2).match(/\n%/)) {
//     }
//     if (data.includes("**2") && data.lastIndexOf("**2") === data.length - 3) {
//         return true;
//     }
//     if (typeof +data[data.length - 1] === "number" && isNaN(+data[data.length - 1])) {
//         return true;
//     }
//     return false;
// }

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
