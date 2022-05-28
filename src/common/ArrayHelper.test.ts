import { describe, expect, it } from 'vitest';

import { ArrayHelper as A } from './ArrayHelper';

describe('ArrayHelper', () => {
  it('mergeArrays', () => {
    const arrayOne = [1, { valueArrays: [2, 3] }, 4];
    const arrayTwo = [['a'], 'b', true, null];
    const arrayThree = [undefined, 4, { value: 2 }];

    const actual = A.mergeArrays([arrayOne, arrayTwo, arrayThree]);
    const expected = [1, { valueArrays: [2, 3] }, 4, ['a'], 'b', true, null, undefined, 4, { value: 2 }];

    expect(actual).toEqual(expected);
  });

  it('createArrayOfIndices', () => {
    const length = 3;
    const actual = A.createArrayOfIndices(length);
    const expected = [0, 1, 2];

    expect(actual).toEqual(expected);
  });

  it('createDigitsArray', () => {
    const length = 3;
    const actual = A.createDigitsArray(length);
    const expected = [1, 2, 3];

    expect(actual).toEqual(expected);
  });

  it('getValuesFromIndices', () => {
    const array = ['a', 'b', 'c', 'd', 'e', 'f'];
    const indices = [1, 2, 3];
    const actual = A.getValuesFromIndices(indices, array);
    const expected = ['b', 'c', 'd'];

    expect(actual).toEqual(expected);
  });
});
