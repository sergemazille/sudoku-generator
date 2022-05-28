<script setup lang="ts">
import { inject, onBeforeMount, ref } from 'vue';
import { Color, Difficulty, GridViewModel, GRID_LENGTH, PICKER_COLORS } from '../Grid/constants';
import { GameService } from '../services/GameService';
import ColorPicker from './ColorPicker.vue';
import Grid from './Grid.vue';

const gameService = inject('gameService') as GameService;

const sudoku = ref([] as Partial<GridViewModel>);
const gameInProgress = ref(true);
const gameId = ref(Date.now());
const currentColor = ref(PICKER_COLORS[0]);

function generateSudoku(difficulty: number) {
  sudoku.value = gameService.create(GRID_LENGTH, difficulty);
}

function endGame() {
  gameInProgress.value = false;
}

function newGame() {
  gameInProgress.value = true;
  gameId.value = Date.now();
  generateSudoku(Difficulty.easy);
}

function updateCurrentColor(value: string) {
  currentColor.value = value;
}

function resolveSudoku() {
  sudoku.value = sudoku.value.map((line) => {
    return line!.map((block) => {
      return block.map((blockSet) => {
        return blockSet.map((cell) => {
          if (!cell.isHidden) {
            return cell;
          }

          cell.color = Color.correct;

          if (cell.referenceValue !== cell.correctValue) {
            cell.color = cell.referenceValue ? Color.error : Color.reveal;
          }

          return cell;
        });
      });
    });
  });

  endGame();
}

onBeforeMount(() => {
  newGame();
});
</script>

<template>
  <div class="wrapper">
    <Grid
      class="grid"
      :key="gameId"
      :gameInProgress="gameInProgress"
      :grid="(sudoku as GridViewModel)"
      :currentColor="currentColor"
      @game-ended="endGame"
    />

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
  opacity: .6;
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
