import { SudokuDigits } from '../grid/SudokuDigits';

onmessage = function ({ data: size }) {
  const { digits } = SudokuDigits.generate(size);

  postMessage(digits);
};
