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

<style scoped lang="scss">
.home {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px 15px;
}
</style>
