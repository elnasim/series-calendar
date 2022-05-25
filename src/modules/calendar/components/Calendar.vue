<template>
  <div class="calendar" v-if="calendar">
    <CalendarControl
      :month="month"
      :year="year"
      @nextMonth="calendarStore.setNextMonth"
      @prevMonth="calendarStore.setPrevMonth"
    />

    <table class="calendar-table">
      <thead class="calendar-table__head">
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
import { computed } from "vue";
import CalendarCell from "./CalendarCell.vue";
import Calendar from "@/modules/calendar/helpers/Calendar";
import CalendarControl from "./CalendarControl.vue";
import { useCalendarStore } from "../store/Calendar";
import { storeToRefs } from "pinia";

const calendarStore = useCalendarStore();
const { changedDate } = storeToRefs(calendarStore);

const calendar = computed(() => {
  return Calendar.calenarGenerate(changedDate.value);
});

const month = computed((): number => {
  const date = new Date(changedDate.value);
  return date.getMonth();
});

const year = computed((): number => {
  const date = new Date(changedDate.value);
  return date.getFullYear();
});
</script>

<style scoped lang="scss">
.calendar {
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
}

.calendar-table {
  width: 100%;
  border-collapse: collapse;
}

.calendar-table__head {
  height: 50px;
  color: #d1d1d1;
}
</style>
