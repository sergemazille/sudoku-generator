import { Cell } from '../grid/Cell';

export const ColorToken = {
  black: 'black',
  cornflowerblue: 'cornflowerblue',
  darkgray: 'darkgray',
  green: 'green',
  purple: 'purple',
  red: 'red',
};

export const Color = {
  default: ColorToken.black,
  hint: ColorToken.black,
  correct: ColorToken.green,
  error: ColorToken.red,
  reveal: ColorToken.purple,
};

export const COLOR_TOKENS = Object.values(ColorToken);
export const PICKER_COLORS = ['CornflowerBlue', 'DarkGray'];

export const GRID_SIZE = 9;

export type Digits = number[];
export type Puzzle = Cell[][][][];
