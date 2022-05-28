import { Digits } from '../common/constants';
import { Sudoku } from './Sudoku';

export class SudokuFactory {
  create(digits: Digits) {
    return Sudoku.fromDigits(digits);
  }
}
