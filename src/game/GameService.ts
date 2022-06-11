import { SudokuDigitsFactory } from '../grid/SudokuDigitsFactory';
import { SudokuFactory } from '../grid/SudokuFactory';

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
