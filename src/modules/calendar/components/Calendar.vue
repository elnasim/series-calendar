<template>
  <div class="container flex flex-wrap" v-if="calendarData">
    <button
      class="mx-auto max-w-[260px] w-full bg-color-4 rounded-md mb-4"
      @click="toggleIsShowOnlyLastEpisodes"
    >
      {{
        getIsShowOnlyLastEpisodes
          ? "Показывать только последние эпизоды сезона"
          : "Показывать все эпизоды"
      }}
    </button>

    <CalendarControl
      :month="month"
      :year="year"
      @nextMonth="setNextMonth"
      @prevMonth="setPrevMonth"
    />

    <table class="w-full border-collapse">
      <thead class="h-12 text-color-4">
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
            :month="month"
            :isShowOnlyLastEpisodes="getIsShowOnlyLastEpisodes"
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
import { ISerialEpisodeWithSerialInfo } from "@/modules/calendar/types";

// Store
const calendarStore = useCalendarStore();
const { setNextMonth, setPrevMonth, toggleIsShowOnlyLastEpisodes } =
  calendarStore;

const { getChangedDate, getIsShowOnlyLastEpisodes } =
  storeToRefs(calendarStore);

const serialsData = ref<ISerialEpisodeWithSerialInfo[]>([]);

const calendarData = computed(() => {
  return calendar.getCalendar(getChangedDate.value, serialsData.value);
});

const month = computed((): number => {
  const date = new Date(getChangedDate.value);
  return date.getMonth();
});

const year = computed((): number => {
  const date = new Date(getChangedDate.value);
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
      `${process.env.VUE_APP_API_URL}/api/episodes/${year.value}/${
        month.value + 1
      }`
    );
    serialsData.value = data.episodes;
  } catch (error) {
    console.log("-->", error);
  }
};
</script>
