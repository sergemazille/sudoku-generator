import App from './App.vue';
import { DigitsWorkerFactory } from './grid/DigitsWorkerFactory';
import { GameService } from './game/GameService';
import { SudokuFactory } from './grid/SudokuFactory';
import { createApp } from 'vue';

const sudokuFactory = new SudokuFactory();
const digitsWorkerFactory = new DigitsWorkerFactory();
const gameService = new GameService(sudokuFactory, digitsWorkerFactory);

const app = createApp(App);

app.provide('gameService', gameService);

app.mount('#app');
