<template>
  <div class="episode">
    <div class="episode__col">
      <div class="episode__edit">
        <input
          @input="update"
          v-model="title"
          class="edit-input"
          type="text"
          placeholder="Название серии"
        />
        <input
          @input="update"
          v-model="day"
          class="edit-input"
          type="text"
          placeholder="День"
        />
        <input
          @input="update"
          v-model="month"
          class="edit-input"
          type="text"
          placeholder="Месяц"
        />
        <input
          @input="update"
          v-model="year"
          class="edit-input"
          type="text"
          placeholder="Год"
        />
      </div>
    </div>

    <div class="episode__control">
      <input @change="checkboxHandler" type="checkbox" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ISerialEpisode } from "@/modules/calendar/interfaces";
import { defineEmits, onMounted, ref } from "vue";

// eslint-disable-next-line no-undef
const props = defineProps<{
  episodeData: ISerialEpisode;
  index: number;
}>();

const emit = defineEmits<{
  (e: "updateEpisodesData", Object: any): void;
  (e: "changeRemoveEpisodesArr", a: number): void;
}>();

const title = ref();
const day = ref();
const month = ref();
const year = ref();

onMounted(() => {
  title.value = props.episodeData.title;
  day.value = props.episodeData.day;
  month.value = props.episodeData.month;
  year.value = props.episodeData.year;
});

const update = () => {
  emit("updateEpisodesData", {
    episodeData: {
      id: props.episodeData.id,
      title: title.value,
      day: +day.value,
      month: month.value,
      year: +year.value,
    },
    index: props.index,
  });
};

const checkboxHandler = () => {
  // @ts-ignore
  emit("changeRemoveEpisodesArr", props.episodeData.id);
};
</script>

<style lang="scss" scoped>
.episode {
  background-color: var(--color-2);
  padding: 5px;
  color: var(--color-5);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  margin-bottom: 10px;
}

.episode__col {
  width: 100%;
}
</style>
