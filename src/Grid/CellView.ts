import { CellViewModel, DataCell } from './constants';

export class CellView {
  static fromDataCell(value: DataCell): CellViewModel {
    return {
      correctValue: value,
      isHidden: false,
      color: 'black',
      referenceValue: value,
    };
  }
}
