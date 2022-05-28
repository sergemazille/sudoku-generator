import { DataBlock, DataGrid, DataLine } from '../Grid/constants';

import { ArrayHelper as A } from '../Grid/ArrayHelper';

export class DataGridFactory {
  create(size: number) {
    const referenceDigits = A.createDigitsArray(size);
    const randomizedArrayItems = A.shuffleArray(referenceDigits);
    const referenceBlock = A.formatToBlock(randomizedArrayItems);
    const referenceLine = this.createBlockVariants(referenceBlock);
    const referenceGrid = this.createGrid(referenceLine);
    const dataGrid = this.shuffleGrid(referenceGrid);

    return dataGrid;
  }

  private createBlockVariants(block: DataBlock) {
    const { length } = block;
    const variants: DataBlock[] = [block];

    for (let i = 0; i < length - 1; i++) {
      const source = [...variants[i]];
      const { length } = source;
      const variant: Partial<DataBlock> = [];

      for (let j = 0; j < length; j++) {
        if (j === 0) {
          variant.push(source.at(-1) as number[]);
          continue;
        }

        variant.push(source.at(j - 1) as number[]);
      }

      variants.push(variant as DataBlock);
    }

    return variants as DataLine;
  }

  private createGrid(referenceLine: DataLine) {
    const gridCols = referenceLine.map((block) => {
      const blockCol = A.invertLinesAndCols(block) as DataBlock;
      const invertedCol = this.createBlockVariants(blockCol);

      return invertedCol.map((block) => {
        return A.invertLinesAndCols(block);
      });
    });

    return A.invertLinesAndCols(gridCols) as DataGrid;
  }

  private shuffleGrid(grid: DataGrid) {
    const toggledGrid = A.invertLinesAndCols(grid);

    const randomized = toggledGrid.map((column) => {
      return A.shuffleArray(column);
    });

    return A.invertLinesAndCols(randomized);
  }
}
