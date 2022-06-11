import { SudokuDigits } from './SudokuDigits';

export class SudokuDigitsFactory {
  create(size: number) {
    return SudokuDigits.generate(size);
  }
}
