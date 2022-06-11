import { COLOR_TOKENS, Color, ColorToken } from '../common/constants';
import { describe, expect, it } from 'vitest';

import { Cell } from './Cell';

describe('Cell', () => {
  it('creates correct instance data', () => {
    const cell = Cell.fromValue(1);

    const actual = cell.data;
    const expected = {
      value: 1,
      isHint: false,
      textColor: Color.hint,
      guess: null,
    };

    expect(actual).toStrictEqual(expected);
  });

  it('throws if text color is not allowed', () => {
    const cell = Cell.fromValue(1);
    const availableColors = [''];
    const actual = () => cell.changeTextColor({ color: 'not available', availableColors });

    expect(actual).toThrow();
  });

  it('changes text color', () => {
    const cell = Cell.fromValue(1);
    const availableColors = COLOR_TOKENS;

    cell.changeTextColor({ color: ColorToken.cornflowerblue, availableColors });

    const actual = cell.data.textColor;
    const expected = ColorToken.cornflowerblue;

    expect(actual).toStrictEqual(expected);
  });

  it('converts to hint', () => {
    const value = 1;
    const cell = Cell.fromValue(value);

    const hintCell = cell.getHintVariant();

    const { isHint, textColor, guess } = hintCell.data;
    const actual = { isHint, textColor, guess };
    const expected = { isHint: true, textColor: Color.hint, guess: value };

    expect(actual).toStrictEqual(expected);
  });
});
