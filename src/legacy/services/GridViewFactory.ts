import { DataGrid, GridViewModel } from '../Grid/constants';

import { CellView } from '../Grid/CellView';

export class GridViewFactory {
  create(dataGrid: DataGrid): GridViewModel {
    return dataGrid.map((line) => {
      return line.map((block) => {
        return block.map((blockSet) => {
          return blockSet.map((cellValue) => {
            return CellView.fromDataCell(cellValue);
          });
        });
      });
    });
  }
}
