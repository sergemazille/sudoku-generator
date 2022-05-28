import App from './App.vue';
import { DataGridFactory } from './services/DataGridFactory';
import { GameService } from './services/GameService';
import { GridGameFactory } from './services/GridGameFactory';
import { GridViewFactory } from './services/GridViewFactory';
import { createApp } from 'vue';

const gameService = () => {
  const gridViewFactory = new GridViewFactory();
  const dataGridFactory = new DataGridFactory();
  const gridGameFactory = new GridGameFactory();

  return new GameService(gridViewFactory, dataGridFactory, gridGameFactory);
};

const app = createApp(App);

app.provide('gameService', gameService());

app.mount('#app');
