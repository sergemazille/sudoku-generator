import { ArrayHelper } from '../common/ArrayHelper';
import { Digits } from '../common/constants';
import { GridHelper } from './GridHelper';
import { Guard } from '../common/Guard';

export class SudokuDigits {
  private constructor(public readonly digits: Digits) {}  

  // brut force...
  static solve(grid: Digits): Digits {
    const gridCopy = [...grid];

    gridCopy.forEach((cellValue, index) => {
      if (cellValue) {
        grid[index] = cellValue;
        return;
      }

      const cellOptions = GridHelper.getOptionsFromCellIndex({ index, grid });
      const chosenIndex = ArrayHelper.pickRandomIndex(cellOptions);
      const value = cellOptions[chosenIndex];

      grid[index] = value;
    });

    const isNotSolved = grid.some((item) => !item);

    if (isNotSolved) {
      return this.solve(gridCopy);
    }

    return grid;
  }

  static seed(size: number) {
    Guard.isSquarableToInt(size);

    const length = size * size;
    const lineCount = Math.sqrt(Math.sqrt(length));
    const gridArray: number[] = Array.from({ length });

    for (let i = 0; i < lineCount; i++) {
      const lineIndex = i;
      const columnIndex = i;
      const blockIndices = GridHelper.getBlockIndices({ lineIndex, columnIndex, grid: gridArray });

      const digitsArray = ArrayHelper.createDigitsArray(size);
      const randomBlock = ArrayHelper.shuffleArray(digitsArray);

      blockIndices.forEach((gridArrayIndex, loopIndex) => {
        gridArray[gridArrayIndex] = randomBlock[loopIndex];
      });
    }

    return gridArray;
  }

  static generate(size: number) {
    const seed = this.seed(size);
    const digits = this.solve(seed);

    return new SudokuDigits(digits);
  }
}
