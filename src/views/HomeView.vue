<template>
  <div class="home">
    <Calendar />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Calendar from "@/modules/calendar/components/Calendar.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    Calendar,
  },
});
</script>
