import { Color, Puzzle } from '../common/constants';

import { DigitsWorkerFactory } from '../grid/DigitsWorkerFactory';
import { SudokuFactory } from '../grid/SudokuFactory';

export class GameService {
  constructor(
    private readonly sudokuFactory: SudokuFactory,
    private readonly digitsWorkerFactory: DigitsWorkerFactory
  ) {}

  async create(size: number) {
    return new Promise((resolve) => {
      const { sudokuFactory, digitsWorkerFactory } = this;
      const digitsWorker = digitsWorkerFactory.create();

      digitsWorker.postMessage(size);

      digitsWorker.onmessage = function ({ data: digits }) {
        const sudoku = sudokuFactory.create(digits);

        resolve(sudoku);
        digitsWorker.terminate();
      };
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
