import { describe, expect, it } from 'vitest';

import { ArrayHelper as A } from '../Grid/ArrayHelper';

describe('ArrayHelper', () => {
  it('mergeArrays', () => {
    const arrayOne = [1, { valueArrays: [2, 3] }, 4];
    const arrayTwo = [['a'], 'b', true, null];
    const arrayThree = [undefined, 4, { value: 2 }];

    const actual = A.mergeArrays([arrayOne, arrayTwo, arrayThree]);
    const expected = [1, { valueArrays: [2, 3] }, 4, ['a'], 'b', true, null, undefined, 4, { value: 2 }];

    expect(actual).toEqual(expected);
  });

  it('invertLinesAndCols', () => {
    const refArray = [
      [1, 2],
      [3, 4],
    ];

    const actual = A.invertLinesAndCols(refArray);
    const expected = [
      [1, 3],
      [2, 4],
    ];

    expect(actual).toEqual(expected);
  });

  it('invertLinesAndCols throws if array length is different from sub-arrays lengths', () => {
    const refArray = [[1, 2], [3]];

    const actual = () => A.invertLinesAndCols(refArray);

    expect(actual).toThrow();
  });

  it('createDigitsArray', () => {
    const length = 3;
    const actual = A.createDigitsArray(length);
    const expected = [1, 2, 3];

    expect(actual).toEqual(expected);
  });
});
