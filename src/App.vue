<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <router-view />
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
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
  background-color: var(--color-1);
  margin: 0;
}

:root {
  --color-1: #22223b;
  --color-2: #4a4e69;
  --color-3: #9a8c98;
  --color-4: #c9ada7;
  --color-5: #f2e9e4;
}
</style>
