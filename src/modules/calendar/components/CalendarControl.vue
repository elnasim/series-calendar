<template>
  <div class="calendar-control">
    <button class="calendar-control__button" @click="$emit('prevMonth')">
      ←
    </button>
    <div class="calendar-control__title">
      {{ Calendar.getMonthByIndex(month) }} | {{ year }}
    </div>
    <button class="calendar-control__button" @click="$emit('nextMonth')">
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
  margin-bottom: 50px;
}

.calendar-control__title {
  color: var(--color-5);
  font-weight: bold;
  font-size: 26px;
  margin: 0 36px;
  width: 210px;
  text-align: center;
}

.calendar-control__button {
  border: none;
  outline: none;
  background-color: var(--color-5);
  color: var(--color-1);
  border-radius: 100%;
  width: 30px;
  height: 30px;
  font-size: 18px;
  cursor: pointer;
  user-select: none;
}
</style>
