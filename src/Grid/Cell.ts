import { Color } from '../common/constants';
import { Guard } from '../common/Guard';

export interface CellData {
  value: number;
  isHint: boolean;
  textColor: string;
  guess: number | null;
}

type ChangeTextColorParams = { color: string; availableColors: string[] };

export class Cell {
  private constructor(
    public readonly value: number,
    public isHint: boolean,
    public textColor: string,
    public guess: number | null
  ) {
    Guard.isInteger(value);
    Guard.isSingleDigitExcluding0(value);
  }

  changeTextColor({ color, availableColors }: ChangeTextColorParams) {
    if (!availableColors.includes(color)) {
      throw new Error('Text color not part of the available colors');
    }

    this.textColor = color;
  }

  getHintVariant() {
    const { value } = this;

    const isHint = true;
    const textColor = Color.hint;
    const guess = value;

    return new Cell(value, isHint, textColor, guess);
  }

  static fromValue(value: number) {
    const isHint = false;
    const textColor = Color.default;
    const guess = null;

    return new Cell(value, isHint, textColor, guess);
  }
}
