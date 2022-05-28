type DataCell = number;
type DataBlock = DataCell[][];
type DataLine = DataBlock[];
type DataGrid = DataLine[];
type AnyArray = any[];

interface CellViewModel {
  correctValue: number;
  isHidden: boolean;
  color: string;
  referenceValue: number;
}

type BlockSetViewModel = CellViewModel[];
type BlockViewModel = BlockSetViewModel[];
type LineViewModel = BlockViewModel[];
type GridViewModel = LineViewModel[];

const GRID_LENGTH = 9;
const PICKER_COLORS = ['CornflowerBlue', 'DarkGray'];

const Color = {
  correct: 'green',
  error: 'red',
  reveal: 'purple'
}

const Difficulty = {
  easy: 0,
  normal: 1,
  hard: 2,
};

export type { AnyArray, BlockViewModel, CellViewModel, DataBlock, DataCell, DataGrid, DataLine, GridViewModel };
export { Color, Difficulty, GRID_LENGTH, PICKER_COLORS };
