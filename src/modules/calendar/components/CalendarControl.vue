<template>
  <div class="w-full flex justify-center items-center mb-12">
    <button
      class="outline-none bg-color-5 text-color-1 rounded-full w-8 h-8 text-lg cursor-pointer select-none"
      @click="$emit('prevMonth')"
    >
      ←
    </button>
    <div
      class="text-color-5 font-bold text-2xl ml-12 mr-12 w-56 text-center select-none"
    >
      {{ Calendar.getMonthByIndex(month) }} | {{ year }}
    </div>
    <button
      class="outline-none bg-color-5 text-color-1 rounded-full w-8 h-8 text-lg cursor-pointer select-none"
      @click="$emit('nextMonth')"
    >
      →
    </button>
  </div>
</template>

<script lang="ts" setup>
import Calendar from "../helpers/Calendar";
import { MonthsEnum } from "@/modules/calendar/types";
// eslint-disable-next-line no-undef
const props = defineProps<{
  month: MonthsEnum;
  year: number;
}>();
</script>
