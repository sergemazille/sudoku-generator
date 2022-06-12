<script setup lang="ts">
import { inject, onBeforeMount, ref } from 'vue';
import { GRID_SIZE, PICKER_COLORS, Puzzle } from '../common/constants';
import ColorPicker from './ColorPicker.vue';
import { GameService } from './GameService';
import Grid from './Grid.vue';
import Spinner from './Spinner.vue';

const gameService = inject('gameService') as GameService;

const sudoku = ref([] as Partial<Puzzle>);
const isLoading = ref(true);
const gameInProgress = ref(true);
const currentColor = ref(PICKER_COLORS[0]);

async function generateSudoku() {
  sudoku.value = (await gameService.create(GRID_SIZE)) as Puzzle;
}

async function newGame() {
  gameInProgress.value = true;
  isLoading.value = true;

  await generateSudoku();
  isLoading.value = false;
}

function updateCurrentColor(value: string) {
  currentColor.value = value;
}

function resolveSudoku() {
  gameInProgress.value = false;
  sudoku.value = gameService.solve(sudoku.value as Puzzle);
}

onBeforeMount(() => {
  newGame();
});
</script>

<template>
  <div class="spinner">
    <Spinner v-if="isLoading" />
  </div>

  <div class="wrapper" v-if="!isLoading">
    <Grid class="grid" :gameInProgress="gameInProgress" :grid="(sudoku as Puzzle)" :currentColor="currentColor" />

    <div>
      <ColorPicker class="color-picker" @color-selected="updateCurrentColor" :selectedColor="currentColor" />

      <div>
        <button class="validate" :disabled="!gameInProgress" @click="resolveSudoku">Vérifier</button>
        <button v-if="!gameInProgress" class="new-game" @click="newGame">Nouvelle partie</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.spinner {
  display: flex;
  justify-content: center;
}

.wrapper {
  display: flex;
}

.grid {
  margin-right: 15px;
}

.color-picker {
  margin-bottom: 15px;
}

button {
  display: block;
  padding: 1rem;
  border: none;
  color: white;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
}

[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}

button:first-of-type {
  margin-bottom: 15px;
}

.validate {
  background-color: rgb(15, 100, 55);
}

.new-game {
  background-color: rgb(59, 61, 60);
}
</style>
