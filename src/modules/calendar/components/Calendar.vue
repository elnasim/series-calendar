<template>
  <div class="calendar" v-if="calendarData">
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
        <tr v-for="(week, index) of calendarData" :key="index">
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
import { computed, onMounted, ref, watch } from "vue";
import CalendarCell from "./CalendarCell.vue";
import calendar from "@/modules/calendar/helpers/Calendar";
import CalendarControl from "./CalendarControl.vue";
import { useCalendarStore } from "../store/Calendar";
import { storeToRefs } from "pinia";
import axios from "axios";
import {
  ISerial,
  ISerialEpisodeWithSerialInfo,
} from "@/modules/calendar/interfaces";

const calendarStore = useCalendarStore();
const { changedDate } = storeToRefs(calendarStore);
const serialsData = ref<ISerialEpisodeWithSerialInfo[]>([]);

const calendarData = computed(() => {
  return calendar.getCalendar(changedDate.value, serialsData.value);
});

const month = computed((): number => {
  const date = new Date(changedDate.value);
  return date.getMonth();
});

const year = computed((): number => {
  const date = new Date(changedDate.value);
  return date.getFullYear();
});

// Monted
onMounted(async () => {
  await fetchCalendarData();
});

const fetchCalendarData = async () => {
  try {
    const { data } = await axios(
      `http://localhost:3000/api/episodes/findAllByMonthAndYear?month=${calendar
        .getMonthByIndex(month.value)
        .toLocaleLowerCase()}&year=${year.value}`
    );
    serialsData.value = data;
  } catch (error) {
    console.log("-->", error);
  }
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

.calendar-table {
  width: 100%;
  border-collapse: collapse;
}

.calendar-table__head {
  height: 50px;
  color: #d1d1d1;
}
</style>
