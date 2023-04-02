import { describe, it, expect } from "vitest";

import {
    PLUS_MINUS_REGEXP,
    MULTIPLY_DIVISION_REGEXP,
    PERCENT_REGEXP,
    ROOT_REGEXP,
    PARENTHESES_REGEXP,
    MOD_REGEXP,
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
});
