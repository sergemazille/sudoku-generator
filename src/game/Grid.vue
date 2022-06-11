<script setup lang="ts">
import { PropType } from 'vue';
import { PICKER_COLORS, Puzzle } from '../common/constants';
import { CellData } from '../grid/Cell';

const props = defineProps({
  grid: {
    type: Array as PropType<Puzzle>,
    default: () => [],
  },

  gameInProgress: {
    type: Boolean,
    default: true,
  },

  currentColor: {
    type: String,
    default: PICKER_COLORS[0],
  },
});

const handleInput = (eventEl: HTMLInputElement, cell: CellData) => {
  const { value } = eventEl;

  if (!value.match(/^\d$/)) {
    eventEl.value = '';
    return;
  }

  cell.guess = +value;
};

const changeCellColor = (cell: CellData) => {
  cell.textColor = props.currentColor;
};
</script>

<template>
  <div>
    <span class="line" :key="index" v-for="(line, index) in grid">
      <span class="block" :key="index" v-for="(block, index) in line">
        <span class="block-set" :key="index" v-for="(blockSet, index) in block">
          <span class="cell" :key="index" v-for="(cell, index) in blockSet">
            <span v-if="gameInProgress" class="full-width">
              <span v-if="cell.isHint" :style="{ color: cell.textColor }" class="hint">
                {{ cell.value }}
              </span>

              <input
                v-if="!cell.isHint"
                type="text"
                pattern="[0-9]+"
                @keyup="handleInput($event.target as HTMLInputElement, cell)"
                @click="changeCellColor(cell)"
                :style="{ color: cell.textColor }"
              />
            </span>

            <span v-else>
              <span :style="{ color: cell.textColor }">{{ cell.guess ?? cell.value }}</span>
            </span>
          </span>
        </span>
      </span>
    </span>
  </div>
</template>

<style scoped>
.line {
  display: flex;
  font-size: 2.2rem;
}

.block {
  border: 2px solid black;
}

.block-set {
  display: flex;
}

.cell {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  width: 60px;
  height: 60px;
}

.full-width {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.hint {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%; 
  background-color: rgb(232, 232, 232);
}

input {
  width: 48px;
  height: 48px;
  border: 0;
  font-size: 2.2rem;
  text-align: center;
}
</style>
