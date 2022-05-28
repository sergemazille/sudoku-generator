import { DataGridFactory } from './DataGridFactory';
import { GridGameFactory } from './GridGameFactory';
import { GridViewFactory } from './GridViewFactory';
import { GridViewModel } from '../Grid/constants';

export class GameService {
  constructor(
    private readonly gridViewFactory: GridViewFactory,
    private readonly dataGridFactory: DataGridFactory,
    private readonly gridGameFactory: GridGameFactory
  ) {}

  create(length: number, difficulty: number): GridViewModel {
    const dataGrid = this.dataGridFactory.create(length);
    const gridView = this.gridViewFactory.create(dataGrid);
    const obfuscatedGridView = this.gridGameFactory.create(gridView, difficulty);

    return obfuscatedGridView;
  }
}
