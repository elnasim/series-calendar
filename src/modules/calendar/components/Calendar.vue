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

    <button
      @click="setCurrentUserDate"
      class="mx-auto max-w-[260px] w-full bg-color-4 rounded-md mb-4"
    >
      На сегодня
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
            @click="showDayPopup(day)"
          />
        </tr>
      </tbody>
    </table>
  </div>

  <CalendarDayPopup
    v-if="dayPopupData"
    :data="dayPopupData"
    :closeDayPopup="closeDayPopup"
  />
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useCalendarStore } from "@/modules/calendar/store/Calendar";
import calendar from "@/modules/calendar/helpers/Calendar";
import calendarService from "@/modules/calendar/services/CalendarService";
import { ISerialEpisodeWithSerialInfo, TDay } from "@/modules/calendar/types";
import CalendarCell from "@/modules/calendar/components/CalendarCell.vue";
import CalendarControl from "@/modules/calendar/components/CalendarControl.vue";
import CalendarDayPopup from "@/modules/calendar/components/CalendarDayPopup.vue";

// Store
const calendarStore = useCalendarStore();
const {
  setNextMonth,
  setPrevMonth,
  toggleIsShowOnlyLastEpisodes,
  setCurrentUserDate,
} = calendarStore;

const { getChangedDate, getIsShowOnlyLastEpisodes } =
  storeToRefs(calendarStore);
// End Store

const serialsData = ref<ISerialEpisodeWithSerialInfo[]>([]);
const dayPopupData = ref<TDay>();

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

onMounted(async () => {
  await fetchCalendarData();
});

watch(month, async () => {
  serialsData.value = [];
  await fetchCalendarData();
});

const fetchCalendarData = async () => {
  try {
    serialsData.value = await calendarService.getSerialsByMonthAndYear(
      month.value,
      year.value
    );
  } catch (error) {
    console.log("-->", error);
  }
};

const showDayPopup = (day: TDay) => {
  if (day?.content.length === 0) return;
  dayPopupData.value = day;
};

const closeDayPopup = () => {
  dayPopupData.value = null;
};
</script>
