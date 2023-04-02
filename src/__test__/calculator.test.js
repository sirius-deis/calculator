import { describe, it, expect } from "vitest";

import {
    PLUS_MINUS_REGEXP,
    MULTIPLY_DIVISION_REGEXP,
    PERCENT_REGEXP,
    ROOT_REGEXP,
    PARENTHESES_REGEXP,
    MOD_REGEXP,
    SQUARE_REGEXP,
    processInput,
} from "../calculator";

describe("#PLUS_MINUS_REGEXP", () => {
    it("should return true from string with two numbers and plus sign", () => {
        const data = "45+23";
        const result = PLUS_MINUS_REGEXP.test(data);
        expect(result).toBeTruthy();
    });
    it("should return true from string with two numbers and minus sign", () => {
        const data = "65-83";
        const result = PLUS_MINUS_REGEXP.test(data);
        expect(result).toBeTruthy();
    });
    it("should return group of numbers and operand in expression with plus", () => {
        const data = "47+23";
        const { number1, operand, number2 } = data.match(PLUS_MINUS_REGEXP).groups;
        expect(number1).toBe("47");
        expect(operand).toBe("+");
        expect(number2).toBe("23");
    });
    it("should return group of numbers and operand in expression with minus", () => {
        const data = "25-93";
        const { number1, operand, number2 } = data.match(PLUS_MINUS_REGEXP).groups;
        expect(number1).toBe("25");
        expect(operand).toBe("-");
        expect(number2).toBe("93");
    });

    it("should return true from string with two numbers which can be decimals and plus sign", () => {
        const data = "55.656+22.2424";
        const result = PLUS_MINUS_REGEXP.test(data);
        expect(result).toBeTruthy();
    });

    it("should return true from string with two numbers which can be decimals and minus sign", () => {
        const data = "15.23-65";
        const result = PLUS_MINUS_REGEXP.test(data);
        expect(result).toBeTruthy();
    });

    it("should return false as there is inappropriate sign", () => {
        const data = "45×23";
        const result = PLUS_MINUS_REGEXP.test(data);
        expect(result).toBeFalsy();
    });
    it("should return false as there is inappropriate sign", () => {
        const data = "45.25÷5.1";
        const result = PLUS_MINUS_REGEXP.test(data);
        expect(result).toBeFalsy();
    });
});

describe("#MULTIPLY_DIVISION_REGEXP", () => {
    it("should return true from string with two numbers and multiply sign", () => {
        const data = "45×23";
        const result = MULTIPLY_DIVISION_REGEXP.test(data);
        expect(result).toBeTruthy();
    });
    it("should return true from string with two numbers and division sign", () => {
        const data = "65÷83";
        const result = MULTIPLY_DIVISION_REGEXP.test(data);
        expect(result).toBeTruthy();
    });
    it("should return group of numbers and operand in expression with multiply", () => {
        const data = "47×23";
        const { number1, operand, number2 } = data.match(MULTIPLY_DIVISION_REGEXP).groups;
        expect(number1).toBe("47");
        expect(operand).toBe("×");
        expect(number2).toBe("23");
    });
    it("should return group of numbers and operand in expression with division", () => {
        const data = "25÷93";
        const { number1, operand, number2 } = data.match(MULTIPLY_DIVISION_REGEXP).groups;
        expect(number1).toBe("25");
        expect(operand).toBe("÷");
        expect(number2).toBe("93");
    });
    it("should return true from string with two numbers which can be decimals and multiply sign", () => {
        const data = "55.24242×22.3";
        const result = MULTIPLY_DIVISION_REGEXP.test(data);
        expect(result).toBeTruthy();
    });
    it("should return true from string with two numbers which can be decimals and division sign", () => {
        const data = "15.232÷65.232424";
        const result = MULTIPLY_DIVISION_REGEXP.test(data);
        expect(result).toBeTruthy();
    });

    it("should return false as there is inappropriate sign", () => {
        const data = "45+23";
        const result = MULTIPLY_DIVISION_REGEXP.test(data);
        expect(result).toBeFalsy();
    });
    it("should return false as there is inappropriate sign", () => {
        const data = "45.25-5.1";
        const result = MULTIPLY_DIVISION_REGEXP.test(data);
        expect(result).toBeFalsy();
    });
});

describe("#PERCENT_REGEXP", () => {
    it("should return true from string with percentage sign", () => {
        const data = "15%";
        const result = PERCENT_REGEXP.test(data);
        expect(result).toBeTruthy();
    });
    it("should return true from string with percentage sign and decimal number", () => {
        const data = "27.23223523%";
        const result = PERCENT_REGEXP.test(data);
        expect(result).toBeTruthy();
    });
    it("should return number in expression with division", () => {
        const data = "28.2542%";
        const { number } = data.match(PERCENT_REGEXP).groups;
        expect(number).toBe("28.2542");
    });
});

describe("#ROOT_REGEXP", () => {
    it("should return should return true from string with square root sign", () => {
        const data = "√15";
        const result = ROOT_REGEXP.test(data);
        expect(result).toBeTruthy();
    });
    it("should return true from string with percentage sign and decimal number", () => {
        const data = "√27.23223523";
        const result = ROOT_REGEXP.test(data);
        expect(result).toBeTruthy();
    });
    it("should return number in expression with root", () => {
        const data = "√28.2542";
        const { number } = data.match(ROOT_REGEXP).groups;
        expect(number).toBe("28.2542");
    });
});

describe("#PARENTHESES_REGEXP", () => {
    it("should return true as there are no parentheses in expression between outer", () => {
        const data = "(20+59)";
        const result = PARENTHESES_REGEXP.test(data);
        expect(result).toBeTruthy();
    });
    it("should return true as there are no parentheses in expression between outer", () => {
        const data = "(54+324×43)";
        const result = PARENTHESES_REGEXP.test(data);
        expect(result).toBeTruthy();
    });
    it("should return true as there are parentheses in expression between outer", () => {
        const data = "(435+(232×45))";
        const result = PARENTHESES_REGEXP.test(data);
        expect(result).toBeTruthy();
    });
    it("should return true as there are parentheses in expression between outer", () => {
        const data = "((2482352+32582-(242*252)÷24)*3)";
        const result = PARENTHESES_REGEXP.test(data);
        expect(result).toBeTruthy();
    });
});

describe("#MOD_REGEXP", () => {
    it("should return true with two numbers and mod", () => {
        const data = "45mod5";
        const result = MOD_REGEXP.test(data);
        expect(result).toBeTruthy();
    });
    it("should return true with two decimal numbers and mod", () => {
        const data = "45.25mod5.1";
        const result = MOD_REGEXP.test(data);
        expect(result).toBeTruthy();
    });
    it("should return false with two decimal numbers and mod", () => {
        const data = "45.25mod√5.1";
        const result = MOD_REGEXP.test(data);
        expect(result).toBeFalsy();
    });
    it("should return false as there is a sign before first number", () => {
        const data = "+45.25mod5.1";
        const result = MOD_REGEXP.test(data);
        expect(result).toBeFalsy();
    });
    it("should return false as there is a sign before first number", () => {
        const data = "-27.25mod3";
        const result = MOD_REGEXP.test(data);
        expect(result).toBeFalsy();
    });
    it("should return numbers", () => {
        const data = "21.3mod3.1";
        const { number1, number2 } = data.match(MOD_REGEXP).groups;
        expect(number1).toBe("21.3");
        expect(number2).toBe("3.1");
    });
});

describe("#SQUARE_REGEXP", () => {
    it("should return true with integer", () => {
        const data = "3**2";
        const result = SQUARE_REGEXP.test(data);
        expect(result).toBeTruthy();
    });
    it("should return true with decimal number", () => {
        const data = "3.542**2";
        const result = SQUARE_REGEXP.test(data);
        expect(result).toBeTruthy();
    });
    it("should return false as there is no square operation there but multiplication", () => {
        const data = "3.5*2";
        const result = SQUARE_REGEXP.test(data);
        expect(result).toBeFalsy();
    });
    it("should return false as there is no square operation there but multiplication and multiplication again", () => {
        const data = "3.542*2*";
        const result = SQUARE_REGEXP.test(data);
        expect(result).toBeFalsy();
    });
    it("should return number with integer", () => {
        const data = "3**2";
        const { number, operand } = data.match(SQUARE_REGEXP).groups;
        expect(number).toBe("3");
        expect(operand).toBe("**2");
    });
    it("should return number with decimal", () => {
        const data = "3.542**2";
        const { number, operand } = data.match(SQUARE_REGEXP).groups;
        expect(number).toBe("3.542");
        expect(operand).toBe("**2");
    });
});

describe("#processInput", () => {
    it("should return 8result of addition on 68 and 19", () => {
        const data = "68+19";
        const result = processInput(data);
        expect(result).toBe((68 + 19).toString());
    });
    it("should return 8result of addition on 14.314 and 132.4214", () => {
        const data = "14.314+132.421";
        const result = processInput(data);
        expect(result).toBe((14.314 + 132.421).toString());
    });
    it("should return result of subtraction on 63.235 and 14.214", () => {
        const data = "63.235-14.21";
        const result = processInput(data);
        expect(result).toBe((63.235 - 14.21).toString());
    });
    it("should return result of multiplication on 25.252 and 3.242", () => {
        const data = "25.252×3.242";
        const result = processInput(data);
        expect(result).toBe((25.252 * 3.242).toString());
    });
    it("should return result of division on 532.352 and 241.5224", () => {
        const data = "532.352÷241.5224";
        const result = processInput(data);
        expect(result).toBe((532.352 / 241.5224).toString());
    });
    it("should return result of square of 4", () => {
        const data = "4**2";
        const result = processInput(data);
        expect(result).toBe((4 ** 2).toString());
    });
    it("should return result of square of 15.342", () => {
        const data = "15.342**2";
        const result = processInput(data);
        expect(result).toBe((15.342 ** 2).toString());
    });
    it("should return result of square root of 8", () => {
        const data = "√8";
        const result = processInput(data);
        expect(result).toBe(Math.sqrt(8).toString());
    });
    it("should return result of square root of 285.2322", () => {
        const data = "√285.2322";
        const result = processInput(data);
        expect(result).toBe(Math.sqrt(285.2322).toString());
    });
});
