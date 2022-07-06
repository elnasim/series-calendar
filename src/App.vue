<template>
  <div class="bg-color-1 font-body">
    <router-view />
  </div>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useCalendarStore } from "@/modules/calendar/store/Calendar";

const calendarStore = useCalendarStore();

onMounted(() => {
  calendarStore.setCurrentUserDate();
});
</script>

<style lang="scss">
@import url("@/modules/common/styles/main.scss");
</style>
