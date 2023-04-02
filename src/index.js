import { parseInput } from "./calculator.js";
const historyEl = document.querySelector(".history"),
    inputPanelEl = document.querySelector(".input__panel"),
    inputInfoEl = document.querySelector(".input__info"),
    buttonsContainer = document.querySelector(".buttons");

let equation = "";

buttonsContainer.addEventListener("click", (e) => {
    const el = e.target.closest(".button");
    if (!el) {
        return;
    }
    const dataset = Object.values(el.dataset)[0];
    if (dataset === "number") {
        updateEquation(el.textContent);
    }
    if (dataset === "parentheses") {
        if (!isParenthesesAllowed()) {
            return;
        }
        updateEquation(el.textContent);
    }
    if (dataset === "dot") {
        if (!checkIfPreviousIsNumber() || checkIfPreviousIsComma() || !isDoteAllowed()) {
            return;
        }
        updateEquation(el.textContent);
    }
    if (dataset === "pi") {
        if (checkIfSignBeforePresent("π")) {
            return;
        }
        updateEquation(el.textContent);
    }
    if (dataset === "sign") {
        if ((!checkIfPreviousIsNumber() && !checkIfPercentWithNumberIsPrevious()) || checkIfPreviousIsComma()) {
            return;
        }
        updateEquation(el.textContent);
    }
    if (dataset === "percent") {
        if (!checkIfPreviousIsNumber() || checkIfPreviousIsComma()) {
            return;
        }
        updateEquation(el.textContent);
    }
    if (dataset === "root") {
        if (
            checkIfSignBeforePresent(el.textContent) ||
            checkIfPreviousIsComma() ||
            checkIfPreviousIsNumber() ||
            checkIfPreviousIsPercentOrMod()
        ) {
            return;
        }
        updateEquation(el.textContent);
    }
    if (dataset === "mod") {
        if (checkIfPreviousIsComma() || (!checkIfPreviousIsNumber() && !checkIfPercentWithNumberIsPrevious())) {
            return;
        }
        updateEquation(el.textContent);
    }
    if (dataset === "clear") {
        clearInput();
    }
    if (dataset === "**") {
        if (checkIfPreviousIsComma() || checkIfSignBeforePresent("**2") || !checkIfPreviousIsNumber()) {
            return;
        }
        updateEquation("**2");
    }
    if (dataset === "equal") {
        const result = parseInput(equation);
        parseInput(equation);
        updateHistory(equation, result);
        clearEquation();
    }

    updateInputEl();
});

document.querySelector('[data-sign="clear"]').addEventListener("contextmenu", (e) => {
    e.preventDefault();
    clearEquation();
    updateInputEl();
});

historyEl.addEventListener("click", (e) => {
    const el = e.target.closest(".history__line");
    const equation = el.firstElementChild.textContent;
    replaceEquation(equation);
    updateInputEl();
});

function updateEquation(value) {
    equation += value;
}

function replaceEquation(value) {
    equation = value;
}

function clearEquation() {
    equation = "";
}

function updateInputEl() {
    let equationForInsert = equation;
    if (equationForInsert.includes("**2")) {
        equationForInsert = equationForInsert.replaceAll("**2", "<sup>2</sup>");
    }
    inputPanelEl.innerHTML = equationForInsert;
}

function clearInput() {
    if (
        equation.length !== 2 &&
        (equation.lastIndexOf("**2") === equation.length - 3 || equation.lastIndexOf("mod") === equation.length - 3)
    ) {
        equation = equation.slice(0, -3);
    } else {
        equation = equation.slice(0, -1);
    }
}

function updateHistory(equation, result) {
    const historyLine = document.createElement("div");
    historyLine.className = "history__line";
    historyLine.innerHTML = `
        <div class="history__left wrap"><span>${equation}</span></div>
        <div class="history__center">=</div>
        <div class="history__right wrap">${result}</div>
    `;
    historyEl.insertAdjacentElement("afterbegin", historyLine);
}

//#TODO:
function clearHistory() {
    historyEl.innerHTML = "";
}

//#TODO:
function updateInfo(info) {
    inputInfoEl.textContent = info;
}
//#TODO:
function clearInfo() {
    inputInfoEl.textContent = "";
}

function isDoteAllowed() {
    const indexOfLastDot = equation.lastIndexOf(".");
    if (indexOfLastDot === -1) {
        return true;
    }
    const extraction = equation.slice(indexOfLastDot);
    if (extraction.includes("+") || extraction.includes("-") || extraction.includes("×") || extraction.includes("÷")) {
        return true;
    }
    return false;
}

function isParenthesesAllowed() {
    if (equation[equation.length - 1] === ".") {
        return false;
    }
    return true;
}

function checkIfPreviousIsPercentOrMod() {
    if (equation[equation.length - 1] === "%" || equation.slice(equation.length - 3) === "mod") {
        return true;
    }
    return false;
}

function checkIfSignBeforePresent(sign) {
    if (equation.slice(equation.length - sign.length) === sign) {
        return true;
    }
    return false;
}

function checkIfPreviousIsNumber() {
    if (typeof +equation[equation.length - 1] === "number" && !isNaN(+equation[equation.length - 1])) {
        return true;
    }
    return false;
}

function checkIfPercentWithNumberIsPrevious() {
    if (equation.slice(equation.length - 2).match(/\d%/)) {
        return true;
    }
    return false;
}

function checkIfPreviousIsComma() {
    if (equation[equation.length - 1] === ".") {
        return true;
    }
    return false;
}
