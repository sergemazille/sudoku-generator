export class Guard {
  static isInteger(value: number) {
    if (!Number.isInteger(value)) {
      throw new Error('value must be an integer');
    }
  }

  static isSingleDigitExcluding0(value: number) {
    if (value < 1 || value > 9) {
      throw new Error('value must be a digit between 1 and 9 included');
    }
  }

  static isSquarableToInt(value: number) {
    Guard.isInteger(value);
    
    if (!Number.isInteger(Math.sqrt(value))) {
      throw new Error('square root of value must be an integer');
    }
  }

  static isSquareRootSquarableToInt(value: number) {
    Guard.isInteger(value);
    
    if (!Number.isInteger(Math.sqrt(Math.sqrt(value)))) {
      throw new Error('square root of square root of value must be an integer');
    }
  }
}