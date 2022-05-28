<script setup lang="ts">
import { PICKER_COLORS as availableColor } from '../common/constants';

const props = defineProps({
  selectedColor: {
    type: String,
    default: 'navy',
  },
});

const emit = defineEmits(['color-selected']);
</script>

<template>
  <div class="pickers">
    <span
      v-for="color in availableColor"
      :style="{ backgroundColor: color }"
      :class="{ selected: selectedColor === color }"
      @click="emit('color-selected', color)"
    >
    </span>
  </div>
</template>

<style scoped>
.pickers {
  display: flex;
}

.pickers span {
  width: 50px;
  height: 50px;
  cursor: pointer;
  border: 4px solid transparent;
}

.pickers span.selected {
  border: 4px solid rgb(7, 47, 81);
}
</style>
