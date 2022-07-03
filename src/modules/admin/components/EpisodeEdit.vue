<template>
  <div class="episode">
    <div class="episode__col">
      <div class="episode__edit">
        <input
          @input="update"
          v-model="titleRef"
          class="episode__edit-input edit-input"
          type="text"
          placeholder="Название серии"
        />

        <input type="date" @change="update" v-model="dateRef" />
      </div>
    </div>

    <div class="episode__control">
      <input @change="checkboxHandler" type="checkbox" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ISerialEpisode } from "@/modules/calendar/types";
import { defineEmits, onMounted, ref } from "vue";
import calendar from "@/modules/calendar/helpers/Calendar";

// eslint-disable-next-line no-undef
const props = defineProps<{
  episodeData: ISerialEpisode;
  index: number;
}>();

const emit = defineEmits<{
  (e: "updateEpisodesData", Object: any): void;
  (e: "changeRemoveEpisodesArr", a: number): void;
}>();

const titleRef = ref();
const dateRef = ref<string>();

onMounted(() => {
  titleRef.value = props.episodeData.title;
  dateRef.value = calendar.getYMDDate(
    new Date(
      props.episodeData.year,
      props.episodeData.month,
      props.episodeData.day
    )
  );
});

const checkboxHandler = () => {
  // @ts-ignore
  emit("changeRemoveEpisodesArr", props.episodeData.id);
};

const update = () => {
  const date = dateRef.value ? new Date(dateRef.value) : new Date();

  emit("updateEpisodesData", {
    episodeData: {
      id: props.episodeData.id,
      title: titleRef.value,
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
    },
    index: props.index,
  });
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

.episode__edit-input {
  background-color: var(--color-1);
  color: var(--color-5);
  border: none;
  margin-bottom: 2px;
  border-radius: 4px;
}
</style>
