<template>
  <form @submit.prevent="submit" class="add-new-episode">
    <input
      v-model="title"
      class="edit-input"
      type="text"
      placeholder="Название"
    />
    <input v-model="day" class="edit-input" type="text" placeholder="День" />
    <input v-model="month" class="edit-input" type="text" placeholder="Месяц" />
    <input v-model="year" class="edit-input" type="text" placeholder="Год" />

    <button class="add-new-episode__button button">Добавить</button>
  </form>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from "vue";
import { IEditSerial } from "@/modules/admin/types";

const title = ref("");
const day = ref("");
const month = ref("");
const year = ref("");

const emit = defineEmits<{
  (e: "addEpisode", Object: IEditSerial): void;
}>();

const submit = () => {
  emit("addEpisode", {
    title: title.value,
    day: day.value,
    month: month.value,
    year: year.value,
  });
};
</script>

<style lang="scss" scoped>
.add-new-episode__button {
  display: block;
  width: 100%;
}
</style>
