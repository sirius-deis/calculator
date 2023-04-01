export const PLUS_MINUS_REGEXP = /^(?<number1>\d+\.?\d+)(?<operand>[\+|-])(?<number2>\d+\.?\d+)$/;
export const MULTIPLY_DIVISION_REGEXP = /^(?<number1>\d+\.?\d+)(?<operand>[\*|\/])(?<number2>\d+\.?\d+)$/;
export const PERCENT_REGEXP = /^(?<number>\d+\.?\d+)%$/;
export const ROOT_REGEXP = /^√\s*(?<number>\d+\.?\d+)$/;
export const PARENTHESES_REGEXP = /^\((?<expression>[^\(\)]+)\)$/;
