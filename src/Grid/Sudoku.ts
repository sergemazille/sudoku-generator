import { Digits, Puzzle } from '../common/constants';

import { ArrayHelper as A } from '../common/ArrayHelper';
import { Cell } from './Cell';
import { GridHelper } from './GridHelper';
import { Guard } from '../common/Guard';

export class Sudoku {
  private static createBlockHints(cellsIndices: any, array: any) {
    return array.map((cell: Cell, index: number) => {
      if (cellsIndices.includes(index)) {
        const cell = array[index] as Cell;
        return cell.getHintVariant();
      }

      return cell;
    });
  }

  private static getBlockNumberOfCellsToKeep(blockIndices: number[]) {
    const { length } = blockIndices;
    const correction = 1 ;
    const randomness = Math.random() * 10 < 7 ? 1 : 0;

    return length - Math.sqrt(length) - randomness - correction;
  }

  static fromDigits(digits: Digits) {
    Guard.isSquareRootSquarableToInt(digits.length);

    const blocksIndices = GridHelper.getBlocksIndices(digits);
    const sourcePuzzleGrid = digits.map(Cell.fromValue);

    const blocksOfCells = blocksIndices.map((blockIndices) => {
      const numberOfCellsToKeep = this.getBlockNumberOfCellsToKeep(blockIndices);
      const indicesOfCellsToKeep = A.pickMultipleRandomValues(numberOfCellsToKeep, blockIndices);
      const blockCellsWithinPuzzle = this.createBlockHints(indicesOfCellsToKeep, sourcePuzzleGrid);
      const blockCells = A.getValuesFromIndices(blockIndices, blockCellsWithinPuzzle);

      return blockCells;
    });

    const blocksCells = A.mergeArrays(blocksOfCells) as Cell[];

    return GridHelper.formatToSudoku(blocksCells);
  }
}
