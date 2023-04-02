export const PLUS_MINUS_REGEXP = /(?<number1>\d+\.?\d*)(?<operand>[\+|-])(?<number2>\d+\.?\d*)/;
export const MULTIPLY_DIVISION_REGEXP = /(?<number1>\d+\.?\d*)(?<operand>[×|÷])(?<number2>\d+\.?\d*)/;
export const PERCENT_REGEXP = /(?<number>\d+\.?\d*)%/;
export const ROOT_REGEXP = /√\s*(?<number>\d+\.?\d*)/;
export const PARENTHESES_REGEXP = /\((?<expression>[^\(\)]+)\)/;
export const MOD_REGEXP = /(?<number1>\d+\.?\d*)mod(?<number2>\d+\.?\d*)/;

export function processInput(data) {
    let expression = data;
    if (MULTIPLY_DIVISION_REGEXP.test(expression)) {
        const [extracted, number1, operand, number2] = MULTIPLY_DIVISION_REGEXP.exec(expression);
        const result = calculate(number1, operand, number2);
        expression = expression.replace(extracted, result);
        return processInput(expression);
    } else if (PLUS_MINUS_REGEXP.test(expression)) {
        const [extracted, number1, operand, number2] = PLUS_MINUS_REGEXP.exec(expression);
        const result = calculate(number1, operand, number2);
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
            return +number1 - +number2;
        case "×":
            return +number1 * +number2;
        case "÷":
            return +number1 / +number2;
        default:
            throw new Error("Input is incorrect");
    }
}
