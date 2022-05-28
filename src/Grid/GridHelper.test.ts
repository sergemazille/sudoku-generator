import { describe, expect, it } from 'vitest';

import { ArrayHelper } from '../common/ArrayHelper';
import { GridHelper } from './GridHelper';

describe('GridHelper', () => {
  it('creates construction grid of correct length', () => {
    const size = 9;
    const grid = GridHelper.createGridOfSize(size);

    const actual = grid.length;
    const expected = size * size;

    expect(actual).toBe(expected);
  });

  it('computes correct line index', () => {
    const grid = GridHelper.createGridOfSize(9);

    const testCases = [
      {
        index: 0,
        expected: 0,
      },
      {
        index: 11,
        expected: 0,
      },
      {
        index: 35,
        expected: 1,
      },
      {
        index: 76,
        expected: 2,
      },
    ];

    testCases.forEach((testCase) => {
      const { index, expected } = testCase;

      const actual = GridHelper.getLineIndexFromCellIndex({ index, grid });

      expect(actual).toEqual(expected);
    });
  });

  it('computes correct column index', () => {
    const grid = GridHelper.createGridOfSize(9);

    const testCases = [
      {
        index: 0,
        expected: 0,
      },
      {
        index: 4,
        expected: 0,
      },
      {
        index: 44,
        expected: 1,
      },
      {
        index: 19,
        expected: 2,
      },
    ];

    testCases.forEach((testCase) => {
      const { index, expected } = testCase;

      const actual = GridHelper.getColumnIndexFromCellIndex({ index, grid });

      expect(actual).toEqual(expected);
    });
  });

  it('computes correct block line index', () => {
    const grid = GridHelper.createGridOfSize(9);

    const testCases = [
      {
        index: 0,
        expected: 0,
      },
      {
        index: 16,
        expected: 2,
      },
      {
        index: 41,
        expected: 1,
      },
      {
        index: 20,
        expected: 0,
      },
    ];

    testCases.forEach((testCase) => {
      const { index, expected } = testCase;

      const actual = GridHelper.getBlockLineIndexFromCellIndex({ index, grid });

      expect(actual).toEqual(expected);
    });
  });

  it('computes correct block column index', () => {
    const grid = GridHelper.createGridOfSize(9);

    const testCases = [
      {
        index: 0,
        expected: 0,
      },
      {
        index: 16,
        expected: 1,
      },
      {
        index: 41,
        expected: 2,
      },
      {
        index: 20,
        expected: 2,
      },
    ];

    testCases.forEach((testCase) => {
      const { index, expected } = testCase;

      const actual = GridHelper.getBlockColumnIndexFromCellIndex({ index, grid });

      expect(actual).toEqual(expected);
    });
  });

  it('get indices of values of same block line', () => {
    const grid = GridHelper.createGridOfSize(9);

    const testCases = [
      {
        index: 12,
        expected: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
      },
      {
        index: 52,
        expected: [
          27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53,
        ],
      },
    ];

    testCases.forEach((testCase) => {
      const { index, expected } = testCase;

      const actual = GridHelper.getBlockLineIndicesFromCellIndex({ index, grid });

      expect(actual).toEqual(expected);
    });
  });

  it('get indices of values of same block columns', () => {
    const grid = GridHelper.createGridOfSize(9);

    const testCases = [
      {
        index: 12,
        expected: [
          9, 10, 11, 12, 13, 14, 15, 16, 17, 36, 37, 38, 39, 40, 41, 42, 43, 44, 63, 64, 65, 66, 67, 68, 69, 70, 71,
        ],
      },
      {
        index: 52,
        expected: [
          18, 19, 20, 21, 22, 23, 24, 25, 26, 45, 46, 47, 48, 49, 50, 51, 52, 53, 72, 73, 74, 75, 76, 77, 78, 79, 80,
        ],
      },
    ];

    testCases.forEach((testCase) => {
      const { index, expected } = testCase;

      const actual = GridHelper.getBlockColumnIndicesFromCellIndex({ index, grid });

      expect(actual).toEqual(expected);
    });
  });

  it('get indices of values of same cell line', () => {
    const grid = GridHelper.createGridOfSize(9);

    const testCases = [
      {
        index: 12,
        expected: [3, 4, 5, 12, 13, 14, 21, 22, 23],
      },
      {
        index: 52,
        expected: [33, 34, 35, 42, 43, 44, 51, 52, 53],
      },
      {
        index: 28,
        expected: [27, 28, 29, 36, 37, 38, 45, 46, 47],
      },
    ];

    testCases.forEach((testCase) => {
      const { index, expected } = testCase;

      const actual = GridHelper.getCellLineIndicesFromCellIndex({ index, grid });

      expect(actual).toEqual(expected);
    });
  });

  it('get indices of values of same cell column', () => {
    const grid = GridHelper.createGridOfSize(9);

    const testCases = [
      {
        index: 12,
        expected: [9, 12, 15, 36, 39, 42, 63, 66, 69],
      },
      {
        index: 52,
        expected: [19, 22, 25, 46, 49, 52, 73, 76, 79],
      },
      {
        index: 28,
        expected: [1, 4, 7, 28, 31, 34, 55, 58, 61],
      },
    ];

    testCases.forEach((testCase) => {
      const { index, expected } = testCase;

      const actual = GridHelper.getCellColumnIndicesFromCellIndex({ index, grid });

      expect(actual).toEqual(expected);
    });
  });

  it('getLineIndices', () => {
    const length = 16;
    const grid = ArrayHelper.createArrayOfIndices(length);
    const lineIndex = 0;

    const actual = GridHelper.getLineIndices({ lineIndex, grid });
    const expected = [0, 1, 2, 3, 4, 5, 6, 7];

    expect(actual).toEqual(expected);
  });

  it('getBlockIndices', () => {
    const length = 16;
    const grid = ArrayHelper.createArrayOfIndices(length);

    const testCases = [
      {
        lineIndex: 0,
        columnIndex: 0,
        expected: [0, 1, 2, 3],
      },
      {
        lineIndex: 0,
        columnIndex: 1,
        expected: [4, 5, 6, 7],
      },
      {
        lineIndex: 1,
        columnIndex: 0,
        expected: [8, 9, 10, 11],
      },
      {
        lineIndex: 1,
        columnIndex: 1,
        expected: [12, 13, 14, 15],
      },
    ];

    testCases.forEach((testCase) => {
      const { lineIndex, columnIndex, expected } = testCase;

      const actual = GridHelper.getBlockIndices({ lineIndex, columnIndex, grid });

      expect(actual).toEqual(expected);
    });
  });

  it('get lines count', () => {
    const length = 16;
    const grid = ArrayHelper.createArrayOfIndices(length);

    const actual = GridHelper.getLinesCount(grid);
    const expected = 2;

    expect(actual).toEqual(expected);
  });

  it('get lines indeices', () => {
    const length = 16;
    const grid = ArrayHelper.createArrayOfIndices(length);

    const actual = GridHelper.getLinesIndices(grid);
    const expected = [
      [0, 1, 2, 3, 4, 5, 6, 7],
      [8, 9, 10, 11, 12, 13, 14, 15],
    ];

    expect(actual).toEqual(expected);
  });

  it('get blocks indices', () => {
    const length = 16;
    const grid = ArrayHelper.createArrayOfIndices(length);

    const actual = GridHelper.getBlocksIndices(grid);
    const expected = [
      [0, 1, 2, 3],
      [4, 5, 6, 7],
      [8, 9, 10, 11],
      [12, 13, 14, 15],
    ];

    expect(actual).toEqual(expected);
  });

  // it('formats digits array to formatted sudoku grid', () => {
  //   const length = 81;
  //   const array = ArrayHelper.createArrayOfIndices(length);

  //   const actual = GridHelper.formatToSudokuDigits(array);
  //   const expected = [
  //     [
  //       [
  //         [0, 1, 2],
  //         [3, 4, 5],
  //         [6, 7, 8],
  //       ],
  //       [
  //         [9, 10, 11],
  //         [12, 13, 14],
  //         [15, 16, 17],
  //       ],
  //       [
  //         [18, 19, 20],
  //         [21, 22, 23],
  //         [24, 25, 26],
  //       ],
  //     ],
  //     [
  //       [
  //         [27, 28, 29],
  //         [30, 31, 32],
  //         [33, 34, 35],
  //       ],
  //       [
  //         [36, 37, 38],
  //         [39, 40, 41],
  //         [42, 43, 44],
  //       ],
  //       [
  //         [45, 46, 47],
  //         [48, 49, 50],
  //         [51, 52, 53],
  //       ],
  //     ],
  //     [
  //       [
  //         [54, 55, 56],
  //         [57, 58, 59],
  //         [60, 61, 62],
  //       ],
  //       [
  //         [63, 64, 65],
  //         [66, 67, 68],
  //         [69, 70, 71],
  //       ],
  //       [
  //         [72, 73, 74],
  //         [75, 76, 77],
  //         [78, 79, 80],
  //       ],
  //     ],
  //   ];

  //   expect(actual).toEqual(expected);
  // });
});
