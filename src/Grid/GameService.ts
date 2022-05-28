import { SudokuDigitsFactory } from './SudokuDigitsFactory';
import { SudokuFactory } from './SudokuFactory';

export class GameService {
  constructor(
    private readonly sudokuDigitsFactory: SudokuDigitsFactory,
    private readonly sudokuFactory: SudokuFactory
  ) {}

  create(size: number) {
    const { digits } = this.sudokuDigitsFactory.create(size);
    const sudoku = this.sudokuFactory.create(digits);

    return sudoku;
  }
}
