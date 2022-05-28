import App from './App.vue';
import { GameService } from './Grid/GameService';
import { SudokuDigitsFactory } from './Grid/SudokuDigitsFactory';
import { SudokuFactory } from './Grid/SudokuFactory';
import { createApp } from 'vue';

const sudokuDigitsFactory = new SudokuDigitsFactory();
const sudokuFactory = new SudokuFactory();
const gameService = new GameService(sudokuDigitsFactory, sudokuFactory);

const app = createApp(App);

app.provide('gameService', gameService);

app.mount('#app');
