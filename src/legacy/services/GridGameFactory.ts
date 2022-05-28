import { AnyArray, CellViewModel, GridViewModel } from '../Grid/constants';

import { ArrayHelper as A } from '../Grid/ArrayHelper';

export class GridGameFactory {
  private getNumberOfCellsToKeep(unformattedBlock: CellViewModel[], difficulty: number) {
    const { length } = unformattedBlock;
    const randomness = Math.random() * 10 > 7 ? 1 : 0;
    const numberOfCellsToKeep: number = length - Math.sqrt(length) - 1 - randomness;

    return numberOfCellsToKeep - difficulty;
  }

  create(gridView: GridViewModel, difficulty: number): GridViewModel {
    return gridView.map((line) => {
      return line.map((block: any) => {
        const unformattedBlock = A.mergeArrays(block);
        const numberOfCellsToKeep = this.getNumberOfCellsToKeep(unformattedBlock as any, difficulty);
        const pickArray = [...unformattedBlock];
        const valuesToKeep: AnyArray = [];

        for (let i = 0; i < numberOfCellsToKeep; i++) {
          const index = A.pickRandomIndex(pickArray);
          const valueToKeep = pickArray.splice(index, 1)[0];
          valuesToKeep.push(valueToKeep);
        }

        const redacted = unformattedBlock.map((cell: any) => {
          if (!valuesToKeep.includes(cell)) {
            cell.isHidden = true;
            cell.referenceValue = null;
          }

          return cell;
        });

        return A.formatToBlock(redacted);
      });
    }) as any;
  }
}
