import App from './App.vue';
import { GameService } from './game/GameService';
import { SudokuDigitsFactory } from './grid/SudokuDigitsFactory';
import { SudokuFactory } from './grid/SudokuFactory';
import { createApp } from 'vue';

const sudokuDigitsFactory = new SudokuDigitsFactory();
const sudokuFactory = new SudokuFactory();
const gameService = new GameService(sudokuDigitsFactory, sudokuFactory);

const app = createApp(App);

app.provide('gameService', gameService);

app.mount('#app');
