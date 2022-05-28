<script setup lang="ts">
import { PropType } from 'vue';
import { CellViewModel, GridViewModel, PICKER_COLORS } from '../Grid/constants';

const props = defineProps({
  grid: {
    type: Array as PropType<GridViewModel>,
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

const changeCellColor = (cell: CellViewModel) => {
  cell.color = props.currentColor;
};

const handleInput = (eventEl: HTMLInputElement, cell: CellViewModel) => {
  const { value } = eventEl;

  if (!value.match(/^\d$/)) {
    eventEl.value = '';
    return;
  }

  cell.referenceValue = +value;
};
</script>

<template>
  <div>
    <span class="line" :key="index" v-for="(line, index) in grid">
      <span class="block" :key="index" v-for="(block, index) in line">
        <span class="block-set" :key="index" v-for="(blockSet, index) in block">
          <span class="cell" :key="index" v-for="(cell, index) in blockSet">
            <span v-if="gameInProgress">
              <span v-if="!cell.isHidden" :style="{ color: cell.color }">{{ cell.correctValue }}</span>
              <input
                v-if="cell.isHidden"
                type="text"
                pattern="[0-9]+"
                @keyup="handleInput($event.target as HTMLInputElement, cell)"
                @click="changeCellColor(cell)"
                :style="{ color: cell.color }"
              />
            </span>

            <span v-else>
              <span :style="{ color: cell.color }">{{ cell.referenceValue ?? cell.correctValue }}</span>
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
  border: 1px solid black;
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
  background-color: rgb(220, 220, 220);
}

input {
  width: 52px;
  height: 52px;
  font-size: 2.2rem;
  text-align: center;
}
</style>
