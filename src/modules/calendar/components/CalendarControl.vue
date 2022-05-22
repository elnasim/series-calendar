<template>
  <div class="calendar-control">
    <button class="calendar-control__arrow" @click="$emit('prevMonth')">
      ←
    </button>
    <div class="calendar-control__title">
      {{ Calendar.getMonthByIndex(month) }} | {{ year }}
    </div>
    <button class="calendar-control__arrow" @click="$emit('nextMonth')">
      →
    </button>
  </div>
</template>

<script lang="ts" setup>
import Calendar from "../helpers/Calendar";
// eslint-disable-next-line no-undef
const props = defineProps<{
  month: number;
  year: number;
}>();
</script>

<style scoped lang="scss">
.calendar-control {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
