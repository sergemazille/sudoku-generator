import { describe, expect, it } from 'vitest';

import { Guard } from './Guard';

describe('Guard', () => {
  it.each([0.123, '', true, null, undefined, NaN, {}, [], Symbol(0)])(
    'throws when "%s" is not an integer',
    (value: any) => {
      const actual = () => Guard.isInteger(value);

      expect(actual).toThrow();
    }
  );

  it.each([-1, 0, 10])('throws when "%s" is not a digit between 1 and 9 included', (value: number) => {
    const actual = () => Guard.isSingleDigitExcluding0(value);

    expect(actual).toThrow();
  });

  it.each([2, 8, 13])('throws when square root of value is not an int', (value) => {
    const actual = () => Guard.isSquarableToInt(value);

    expect(actual).toThrow();
  })

  it.each([4, 64, 100])('throws when square root of square root of value is not an int', (value) => {
    const actual = () => Guard.isSquareRootSquarableToInt(value);

    expect(actual).toThrow();
  })
});
