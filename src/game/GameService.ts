import { Color, Puzzle } from '../common/constants';

import { SudokuDigitsFactory } from '../grid/SudokuDigitsFactory';
import { SudokuFactory } from '../grid/SudokuFactory';

export class GameService {
  constructor(
    private readonly sudokuDigitsFactory: SudokuDigitsFactory,
    private readonly sudokuFactory: SudokuFactory
  ) {}

  async create(size: number) {
    return new Promise((resolve) => {
      const { digits } = this.sudokuDigitsFactory.create(size);
      const sudoku = this.sudokuFactory.create(digits);

      return resolve(sudoku);
    });
  }

  solve(sudoku: Puzzle) {
    return sudoku.map((line) => {
      return line!.map((block) => {
        return block.map((blockSet) => {
          return blockSet.map((cell) => {
            if (cell.isHint) {
              return cell;
            }

            cell.textColor = Color.correct;

            if (cell.guess !== cell.value) {
              cell.textColor = cell.guess ? Color.error : Color.reveal;
            }

            return cell;
          });
        });
      });
    });
  }
}
