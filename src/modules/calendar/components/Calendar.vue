<template>
  <div class="calendar" v-if="calendar">
    <CalendarControl
      :month="month"
      :year="year"
      @nextMonth="nextMonth"
      @prevMonth="prevMonth"
    />

    <table style="width: 100%">
      <thead>
        <tr>
          <th>ПН</th>
          <th>ВТ</th>
          <th>СР</th>
          <th>ЧТ</th>
          <th>ПТ</th>
          <th>СБ</th>
          <th>ВС</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(week, index) of calendar" :key="index">
          <CalendarCell
            v-for="(day, index) of week"
            :key="index"
            :dayData="day"
          />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, computed } from "vue";
import type { Ref } from "vue";
import CalendarCell from "./CalendarCell.vue";
import { TCalendar } from "@/modules/calendar/interfaces";
import Calendar from "@/modules/calendar/helpers/Calendar";
import CalendarControl from "./CalendarControl.vue";

const year = ref(2022);
const month = ref(4);

const calendar = computed(() => {
  return Calendar.calenarGenerate(month.value, year.value);
});

const nextMonth = () => {
  const date = new Date(year.value, month.value + 1);
  month.value = date.getMonth();
  year.value = date.getFullYear();
};

const prevMonth = () => {
  const date = new Date(year.value, month.value - 1);
  month.value = date.getMonth();
  year.value = date.getFullYear();
};
</script>

<style scoped lang="scss">
.calendar {
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
}

.calendar__row {
  display: flex;
  width: 100%;
}
</style>
