import { Digits, Puzzle } from '../common/constants';

import { ArrayHelper } from '../common/ArrayHelper';
import { Cell } from './Cell';
import { Guard } from '../common/Guard';

export class GridHelper {
  private static formatToSquareRoot<T extends unknown[], U extends unknown[]>({ array, grid }: { array: T; grid: U }) {
    Guard.isSquareRootSquarableToInt(grid.length);

    const sourceLength = array.length;
    const subArraysCount = Math.sqrt(Math.sqrt(grid.length));
    const subArrayLength = sourceLength / subArraysCount;
    const result = [];

    for (let i = 0; i < subArraysCount; i++) {
      const startIndex = i * subArrayLength;
      const endIndexExcluded = startIndex + subArrayLength;

      result.push(array.slice(startIndex, endIndexExcluded));
    }

    return result;
  }

  private static formatBlockToBlockLines<T extends unknown[], U extends unknown[]>({ array, grid }: { array: T; grid: U }) {
    return GridHelper.formatToSquareRoot({ array, grid });
  }

  private static formatLineToBlocks<T extends unknown[], U extends unknown[]>({ array, grid }: { array: T; grid: U }) {
    return GridHelper.formatToSquareRoot({ array, grid });
  }

  private static formatGridToLines<T extends unknown[]>(array: T) {
    return GridHelper.formatToSquareRoot({ array, grid: array });
  }

  static formatToSudoku(cells: Cell[]) {
    const lines = GridHelper.formatGridToLines(cells) as Cell[][];
    const blocks = lines.map((line) => GridHelper.formatLineToBlocks({ array: line, grid: cells }));

    return blocks.map((block) => {
      return block.map((blockLines) => {
        return GridHelper.formatBlockToBlockLines({ array: blockLines, grid: cells });
      });
    }) as Puzzle;
  }

  static createGridOfSize(size: number) {
    Guard.isInteger(size);

    const length = size * size;

    return Array.from({ length }) as number[];
  }

  static getLineIndexFromCellIndex({ index, grid }: { index: number; grid: Digits }) {
    const { length } = grid;
    const lineCount = GridHelper.getLinesCount(grid);
    const lineLength = length / lineCount;

    return Math.floor(index / lineLength);
  }

  static getColumnIndexFromCellIndex({ index, grid }: { index: number; grid: Digits }) {
    const { length } = grid;
    const lineCount = GridHelper.getLinesCount(grid);
    const columnCount = lineCount;
    const lineLength = length / columnCount;
    const lineIndex = GridHelper.getLineIndexFromCellIndex({ index, grid });
    const indexWithinLine = index - lineLength * lineIndex;

    return Math.floor(indexWithinLine / (lineLength / columnCount));
  }

  static getBlockLineIndexFromCellIndex({ index, grid }: { index: number; grid: Digits }) {
    const { length } = grid;
    const blockLineCount = Math.sqrt(length);
    const lineCount = GridHelper.getLinesCount(grid);
    const columnCount = lineCount;
    const linesInBlockCount = lineCount;
    const lineLength = length / columnCount;
    const lineIndex = GridHelper.getLineIndexFromCellIndex({ index, grid });
    const columnIndex = GridHelper.getColumnIndexFromCellIndex({ index, grid });
    const indexWithinLine = index - lineLength * lineIndex;
    const indexWithinColumn = indexWithinLine - blockLineCount * columnIndex;

    return Math.floor(indexWithinColumn / linesInBlockCount);
  }

  static getBlockColumnIndexFromCellIndex({ index, grid }: { index: number; grid: Digits }) {
    const { length } = grid;
    const blockLineCount = Math.sqrt(length);
    const columnCount = GridHelper.getLinesCount(grid);
    const lineLength = length / columnCount;
    const lineIndex = GridHelper.getLineIndexFromCellIndex({ index, grid });
    const columnIndex = GridHelper.getColumnIndexFromCellIndex({ index, grid });
    const indexWithinLine = index - lineLength * lineIndex;
    const indexWithinColumn = indexWithinLine - blockLineCount * columnIndex;
    const blockLineIndex = GridHelper.getBlockLineIndexFromCellIndex({ index, grid });

    return indexWithinColumn - blockLineIndex * columnCount;
  }

  static getLineIndices({ lineIndex, grid }: { lineIndex: number; grid: Digits }) {
    const { length } = grid;
    const lineCount = GridHelper.getLinesCount(grid);
    const lineLength = length / lineCount;

    const indices = ArrayHelper.createArrayOfIndices(length);
    const startIndex = lineIndex * lineLength;
    const endIndexExcluded = startIndex + lineLength;

    return indices.slice(startIndex, endIndexExcluded);
  }

  static getBlockIndices({ lineIndex, columnIndex, grid }: { lineIndex: number; columnIndex: number; grid: Digits }) {
    const { length } = grid;
    const blockCount = Math.sqrt(length);
    const blockLength = length / blockCount;
    const lineIndices = GridHelper.getLineIndices({ lineIndex, grid });

    const startIndex = columnIndex * blockLength;
    const endIndexExcluded = startIndex + blockLength;

    return lineIndices.slice(startIndex, endIndexExcluded);
  }

  static getBlockLineIndicesFromCellIndex({ index, grid }: { index: number; grid: Digits }) {
    const lineIndex = GridHelper.getLineIndexFromCellIndex({ index, grid });
    const indicesGrid = grid.map((_, itemIndex) => itemIndex);

    return indicesGrid.filter((itemIndex) => {
      const lineIndexForItemIndex = GridHelper.getLineIndexFromCellIndex({ index: itemIndex, grid });

      return lineIndex === lineIndexForItemIndex;
    });
  }

  static getBlockColumnIndicesFromCellIndex({ index, grid }: { index: number; grid: Digits }) {
    const columnIndex = GridHelper.getColumnIndexFromCellIndex({ index, grid });
    const indicesGrid = grid.map((_, itemIndex) => itemIndex);

    return indicesGrid.filter((itemIndex) => {
      const columnIndexForItemIndex = GridHelper.getColumnIndexFromCellIndex({ index: itemIndex, grid });

      return columnIndex === columnIndexForItemIndex;
    });
  }

  static getCellLineIndicesFromCellIndex({ index, grid }: { index: number; grid: Digits }) {
    const cellLineIndex = GridHelper.getBlockLineIndexFromCellIndex({ index, grid });

    const blockLineIndices = GridHelper.getBlockLineIndicesFromCellIndex({ index, grid });

    return blockLineIndices.filter((itemIndex) => {
      const cellLineIndexForItemIndex = GridHelper.getBlockLineIndexFromCellIndex({ index: itemIndex, grid });

      return cellLineIndex === cellLineIndexForItemIndex;
    });
  }

  static getCellColumnIndicesFromCellIndex({ index, grid }: { index: number; grid: Digits }) {
    const cellColumnIndex = GridHelper.getBlockColumnIndexFromCellIndex({ index, grid });

    const blockColumnIndices = GridHelper.getBlockColumnIndicesFromCellIndex({ index, grid });

    return blockColumnIndices.filter((itemIndex) => {
      const cellColumnIndexForItemIndex = GridHelper.getBlockColumnIndexFromCellIndex({ index: itemIndex, grid });

      return cellColumnIndex === cellColumnIndexForItemIndex;
    });
  }

  static getLinesCount(grid: Digits) {
    const { length } = grid;
    const size = Math.sqrt(length);

    return Math.sqrt(size);
  }

  static getLinesIndices(grid: Digits) {
    const linesCount = GridHelper.getLinesCount(grid);

    return Array.from({ length: linesCount }).map((_, lineIndex) => GridHelper.getLineIndices({ lineIndex, grid }));
  }

  static getBlocksIndices(grid: Digits) {
    const linesIndices = GridHelper.getLinesIndices(grid);
    const blocksIndicesInLines = linesIndices.map((lines) => {
      return GridHelper.formatLineToBlocks({ array: lines, grid });
    });

    return ArrayHelper.mergeArrays(blocksIndicesInLines) as number[][];
  }

  static getOptionsFromCellIndex({ index, grid }: { index: number; grid: Digits }) {
    if (grid[index]) {
      return [];
    }

    const options: number[] = [];

    const lineIndex = GridHelper.getLineIndexFromCellIndex({ index, grid });
    const columnIndex = GridHelper.getColumnIndexFromCellIndex({ index, grid });

    const blockIndices = GridHelper.getBlockIndices({ lineIndex, columnIndex, grid });
    const cellLineIndices = GridHelper.getCellLineIndicesFromCellIndex({ index, grid });
    const cellColumnIndices = GridHelper.getCellColumnIndicesFromCellIndex({ index, grid });

    const blockValues = blockIndices.map((index) => {
      return grid[index];
    });
    const lineValues = cellLineIndices.map((index) => {
      return grid[index];
    });
    const columnValues = cellColumnIndices.map((index) => {
      return grid[index];
    });

    const { length } = grid;
    const size = Math.sqrt(length);
    const availableDigits = ArrayHelper.createDigitsArray(size);

    availableDigits.forEach((digit) => {
      const alreadyTakenInBlock = blockValues.includes(digit);
      const alreadyTakenInLine = lineValues.includes(digit);
      const alreadyTakenInColumn = columnValues.includes(digit);

      if (!alreadyTakenInBlock && !alreadyTakenInLine && !alreadyTakenInColumn) {
        options.push(digit);
      }
    });

    return options;
  }
}
