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

historyEl.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    const target = e.target;
    const line = target.closest(".history__line");
    if (!line) return;
    line.remove();
});

function checkValidity(character) {
    if (typeof +character === "number" && !isNaN(+character)) {
        if (!isNumberAllowed()) {
            return;
        }
        updateEquation(character);
    }
    if (["(", ")"].includes(character)) {
        if (!isParenthesesAllowed(character)) {
            return;
        }
        updateEquation(character);
    }
    if (character === ".") {
        if (!isPreviousNumber() || !isDoteAllowed()) {
            return;
        }
        updateEquation(character);
    }
    if (character === "π") {
        if (isSignBeforePresent("π") || isPreviousNumber()) {
            return;
        }
        updateEquation(character);
    }
    if (["+", "-", "×", "÷"].includes(character)) {
        if ((!isPreviousNumber() && !isPreviousParentheses() && !isSignBeforePresent("%")) || isPreviousDot()) {
            return;
        }
        updateEquation(character);
    }
    if (character === "%") {
        if (!isPreviousNumber() || isPreviousDot()) {
            return;
        }
        updateEquation(character);
    }
    if (character === "√") {
        if (isSignBeforePresent(character) || isPreviousDot() || isPreviousNumber() || isPreviousPercentOrMod()) {
            return;
        }
        updateEquation(character);
    }
    if (character === "mod") {
        if (isPreviousDot() || !isPreviousNumber()) {
            return;
        }
        updateEquation(character);
    }

    if (character === "**2") {
        if (isPreviousDot() || isSignBeforePresent("**2") || !isPreviousNumber()) {
            return;
        }
        updateEquation(character);
    }
}

function showResult() {
    if (equation.length < 1) {
        return;
    }
    const result = parseInput(equation);
    if (!result.match(/^\d+\.?\d*$/)) {
        updateInfo("Malformed expression");
        return;
    }
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
    const historyLeft = document.createElement("div");
    historyLeft.className = "history__left wrap";
    historyLeft.textContent = equation;
    historyLeft.title = equation;
    const historyCenter = document.createElement("div");
    historyCenter.className = "history__center";
    const historyRight = document.createElement("div");
    historyRight.className = "history__right wrap";
    historyRight.textContent = result;
    historyRight.title = result;
    historyLine.append(historyLeft, historyCenter, historyRight);
    historyEl.insertAdjacentElement("afterbegin", historyLine);
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
    if (equation.slice(equation.length - 1) === "π") {
        return false;
    }
    // if (equation.match(/[\+|-|×|÷]/) && !["+", "-", "×", "÷"].includes(equation[equation.length - 1])) {
    //     return false;
    // }
    return true;
}

function isDoteAllowed() {
    const indexOfLastDot = equation.lastIndexOf(".");
    if (indexOfLastDot === -1) {
        return true;
    }
    const extraction = equation.slice(indexOfLastDot);
    if (!extraction.match(/[\+|-|×|÷]/)) {
        return false;
    }
    if (isPreviousDot()) {
        return false;
    }
    return true;
}

function isParenthesesAllowed(character) {
    if (equation[equation.length - 1] === "." || equation.slice(equation.length - 3) === "mod") {
        return false;
    }
    if (character !== "(" && !equation.includes("(")) {
        return false;
    }
    return true;
}

function isPreviousPercentOrMod() {
    if (equation[equation.length - 1] === "%" || equation.slice(equation.length - 3) === "mod") {
        return true;
    }
    return false;
}

function isSignBeforePresent(sign) {
    if (equation.slice(equation.length - sign.length) === sign) {
        return true;
    }
    return false;
}

function isPreviousNumber() {
    if (
        (typeof +equation[equation.length - 1] === "number" && !isNaN(+equation[equation.length - 1])) ||
        equation[equation.length - 1] === "π"
    ) {
        return true;
    }
    return false;
}

function isPreviousDot() {
    if (equation[equation.length - 1] === ".") {
        return true;
    }
    return false;
}

function isPreviousParentheses() {
    return equation[equation.length - 1] === ")";
}
