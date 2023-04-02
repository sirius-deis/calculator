export const SQUARE_REGEXP = /(?<number>\d+\.?\d*)(?<operand>\*{2}2)/;
export const ROOT_REGEXP = /√\s*(?<number>\d+\.?\d*)/;
export const PERCENT_REGEXP = /(?<number>\d+\.?\d*)%/;
export const PARENTHESES_REGEXP = /\((?<equation>[^\(\)]+)\)/;
export const MULTIPLY_DIVISION_REGEXP = /(?<number1>\d+\.?\d*)(?<operand>[×÷])(?<number2>\d+\.?\d*)/;
export const PLUS_MINUS_REGEXP = /(?<number1>\d+\.?\d*)(?<operand>[\+-])(?<number2>\d+\.?\d*)/;
export const MOD_REGEXP = /(?<![+-×÷])(?<number1>\d+\.?\d*)mod(?<number2>\d+\.?\d*)/;

export function parseInput(data) {
    const parsedString = data
        .replaceAll("π", Math.PI)
        .replace(/(\d+\.?\d*)\(/g, (match) => {
            return `${match.slice(0, 1)}*${match.slice(1)}`;
        })
        .replace(/\)(\d+\.?\d*)/g, (match) => {
            return `${match.slice(0, 1)}*${match.slice(1)}`;
        });
    return processInput(parsedString);
}

function processInput(data) {
    let expression = data;
    if (SQUARE_REGEXP.test(expression)) {
        const [extracted, number, operand] = SQUARE_REGEXP.exec(expression);
        const result = calculate(number, operand);
        expression = expression.replace(extracted, result);
        return processInput(expression);
    } else if (ROOT_REGEXP.test(expression)) {
        const [extracted, number] = ROOT_REGEXP.exec(expression);
        const result = calculate(number, "root");
        expression = expression.replace(extracted, result);
        return processInput(expression);
    } else if (PERCENT_REGEXP.test(expression)) {
        const [extracted, number] = PERCENT_REGEXP.exec(expression);
        const result = calculate(number, "percent");
        expression = expression.replace(extracted, result);
        return processInput(expression);
    } else if (PARENTHESES_REGEXP.test(expression)) {
        const [extracted, equation] = PARENTHESES_REGEXP.exec(expression);
        const result = processInput(equation);
        expression = expression.replace(extracted, result);
        return processInput(expression);
    } else if (MULTIPLY_DIVISION_REGEXP.test(expression)) {
        const [extracted, number1, operand, number2] = MULTIPLY_DIVISION_REGEXP.exec(expression);
        const result = calculate(number1, operand, number2);
        expression = expression.replace(extracted, result);
        return processInput(expression);
    } else if (PLUS_MINUS_REGEXP.test(expression)) {
        const [extracted, number1, operand, number2] = PLUS_MINUS_REGEXP.exec(expression);
        const result = calculate(number1, operand, number2);
        expression = expression.replace(extracted, result);
        return processInput(expression);
    } else if (MOD_REGEXP.test(expression)) {
        const [extracted, number1, number2] = MOD_REGEXP.exec(expression);
        const result = calculate(number1, "mod", number2);
        expression = expression.replace(extracted, result);
        return processInput(expression);
    } else {
        return expression;
    }
}

function calculate(number1, operand, number2) {
    switch (operand) {
        case "+":
            return +number1 + +number2;
        case "-":
            return number1 - number2;
        case "×":
            return number1 * number2;
        case "÷":
            return number1 / number2;
        case "**2":
            return number1 ** 2;
        case "root":
            return Math.sqrt(number1);
        case "mod":
            return number1 % number2;
        case "percent":
            return number1 / 100;
        default:
            throw new Error("Input is incorrect");
    }
}
