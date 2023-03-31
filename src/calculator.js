export const PLUS_MINUS_REGEXP = /^(?<number1>\d+\.?\d+)\s*(?<operand>[\+|-])\s*(?<number2>\d+\.?\d+)$/;
export const MULTIPLY_DIVISION_REGEXP = /^(?<number1>\d+\.?\d+)\s*(?<operand>[\*|\/])\s*(?<number2>\d+\.?\d+)$/;
export const PERCENT_REGEXP = /^(?<number>\d+\.?\d+)\s*%$/;
export const SQUARE_ROOT_REGEXP = /^√\s*(?<number>\d+\.?\d+)$/;
export const PARENTHESES_REGEXP = /\(([^\(\)]+)\)/;
