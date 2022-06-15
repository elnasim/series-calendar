<template>
  <div class="calendar" v-if="calendarData">
    <CalendarControl
      :month="month"
      :year="year"
      @nextMonth="setNextMonth"
      @prevMonth="setPrevMonth"
    />

    <table class="calendar-table">
      <thead class="calendar-table__head">
        <tr>
          <th><span style="width: 40px; display: inline-block">ПН</span></th>
          <th><span style="width: 40px; display: inline-block">ВТ</span></th>
          <th><span style="width: 40px; display: inline-block">СР</span></th>
          <th><span style="width: 40px; display: inline-block">ЧТ</span></th>
          <th><span style="width: 40px; display: inline-block">ПТ</span></th>
          <th><span style="width: 40px; display: inline-block">СБ</span></th>
          <th><span style="width: 40px; display: inline-block">ВС</span></th>
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
import { ISerialEpisodeWithSerialInfo, MonthsEnum } from "@/modules/calendar/types";

// Store
const calendarStore = useCalendarStore();
const { setNextMonth, setPrevMonth } = calendarStore;
const { changedDate } = storeToRefs(calendarStore);

const serialsData = ref<ISerialEpisodeWithSerialInfo[]>([]);

const calendarData = computed(() => {
  return calendar.getCalendar(changedDate.value, serialsData.value);
});

const month = computed((): MonthsEnum => {
  const date = new Date(changedDate.value);
  return date.getMonth();
});

const year = computed((): number => {
  const date = new Date(changedDate.value);
  return date.getFullYear();
});

// Mounted
onMounted(async () => {
  await fetchCalendarData();
});

watch(month, async () => {
  serialsData.value = [];
  await fetchCalendarData();
});

const fetchCalendarData = async () => {
  try {
    const { data } = await axios(
      `http://localhost:3000/api/episodes/findAllByMonthAndYear?month=${month.value}&year=${year.value}`
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
  color: var(--color-4);
}
</style>
