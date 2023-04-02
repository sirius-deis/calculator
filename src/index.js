import { parseInput } from "./calculator.js";
const historyEl = document.querySelector(".history"),
    inputPanelEl = document.querySelector(".input__panel"),
    inputInfoEl = document.querySelector(".input__info"),
    buttonsContainer = document.querySelector(".buttons"),
    dummyInputEl = document.querySelector(".input__dummy");

let equation = "";

buttonsContainer.addEventListener("click", (e) => {
    const el = e.target.closest(".button");
    if (!el) {
        return;
    }
    const dataset = Object.values(el.dataset)[0];
    if (["number", "parentheses", "dot", "pi", "sign", "percent", "root", "mod"].includes(dataset)) {
        checkValidity(el.textContent);
    }

    if (dataset === "**2") {
        checkValidity(dataset);
    }
    if (dataset === "clear") {
        removeOneCharacter();
    }
    if (dataset === "equal") {
        showResult();
    }

    updateInputEl();
});

inputPanelEl.addEventListener("click", () => {
    dummyInputEl.value = "";
    dummyInputEl.focus();
});

window.addEventListener("keydown", (e) => {
    const code = e.code;
    const shift = e.shiftKey;
    if (code.startsWith("Digit") && !shift) {
        checkValidity(code.slice(code.length - 1));
    }
    if (["Digit9", "Digit0"].includes(code) && shift) {
        checkValidity(code.endsWith("9") ? "(" : ")");
    }
    if (["Backslash", "Digit8", "Equal", "Minus", "Digit5"].includes(code) && shift) {
        let digit;
        if (code === "Backslash") {
            digit = "÷";
        } else if (code === "Digit8") {
            digit = "×";
        } else if (code === "Equal") {
            digit = "+";
        } else if (code === "Minus") {
            digit = "-";
        } else {
            digit = "%";
        }
        checkValidity(digit);
    }
    if (code === "Backspace") {
        removeOneCharacter();
    }
    if (code === "Enter") {
        showResult();
    }
    updateInputEl();
});

dummyInputEl.addEventListener("input", (e) => {
    const data = e.target.value;
    if (data.length > 1) {
        for (let i = 0; i < data.length; i++) {
            checkValidity(data[i]);
        }
        updateInputEl();
    }
    e.target.value = "";
});

document.querySelector('[data-sign="clear"]').addEventListener("contextmenu", (e) => {
    e.preventDefault();
    clearEquation();
    updateInputEl();
});

historyEl.addEventListener("click", (e) => {
    const target = e.target;
    const line = target.closest(".history__line");
    if (!line) return;
    let equation;
    if (target.className.includes("history__left")) {
        equation = line.firstElementChild.textContent;
        replaceEquation(equation);
    }
    if (target.className.includes("history__right") && isNumberAllowed()) {
        equation = line.lastElementChild.textContent;
        updateEquation(equation);
    }
    updateInputEl();
});

function checkValidity(character) {
    if (typeof +character === "number" && !isNaN(+character)) {
        updateEquation(character);
    }
    if (["(", ")"].includes(character)) {
        if (!isParenthesesAllowed()) {
            return;
        }
        updateEquation(character);
    }
    if (character === ".") {
        if (!checkIfPreviousIsNumber() || checkIfPreviousIsDot() || !isDoteAllowed()) {
            return;
        }
        updateEquation(character);
    }
    if (character === "π") {
        if (checkIfSignBeforePresent("π")) {
            return;
        }
        updateEquation(character);
    }
    if (["+", "-", "×", "÷"].includes(character)) {
        if ((!checkIfPreviousIsNumber() && !checkIfPercentWithNumberIsPrevious()) || checkIfPreviousIsDot()) {
            return;
        }
        updateEquation(character);
    }
    if (character === "%") {
        if (!checkIfPreviousIsNumber() || checkIfPreviousIsDot()) {
            return;
        }
        updateEquation(character);
    }
    if (character === "√") {
        if (
            checkIfSignBeforePresent(character) ||
            checkIfPreviousIsDot() ||
            checkIfPreviousIsNumber() ||
            checkIfPreviousIsPercentOrMod()
        ) {
            return;
        }
        updateEquation(character);
    }
    if (character === "mod") {
        if (checkIfPreviousIsDot() || (!checkIfPreviousIsNumber() && !checkIfPercentWithNumberIsPrevious())) {
            return;
        }
        updateEquation(character);
    }

    if (character === "**2") {
        if (checkIfPreviousIsDot() || checkIfSignBeforePresent("**2") || !checkIfPreviousIsNumber()) {
            return;
        }
        updateEquation(character);
    }
}

function showResult() {
    const result = parseInput(equation);
    parseInput(equation);
    updateHistory(equation, result);
    clearEquation();
}

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

function removeOneCharacter() {
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
        <div class="history__left wrap">${equation}</div>
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

function isNumberAllowed() {
    if (["+", "-", "×", "÷"].includes(equation[equation.length - 1])) {
        return true;
    }
    return false;
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

function checkIfPreviousIsDot() {
    if (equation[equation.length - 1] === ".") {
        return true;
    }
    return false;
}
