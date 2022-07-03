<template>
  <div class="show-serial">
    <div class="container">
      <label class="show-serial-label">
        <span class="show-serial-label__title">Название сериала</span>
        <input v-model="title" class="edit-input" type="text" />
      </label>

      <label class="show-serial-label">
        <span class="show-serial-label__title">Ссылка на изображение</span>
        <input v-model="imgLink" class="edit-input" type="text" />
      </label>

      <div class="show-serial__control">
        <button
          @click="updateSerial"
          class="show-serial__control-button button"
        >
          Сохранить
        </button>

        <button
          @click="removeSerialById"
          class="show-serial__control-button button"
        >
          Удалить
        </button>
      </div>

      <div class="episodes" v-if="serial && serial.episodes">
        <div class="episodes__title">Эпизоды</div>

        <EpisodeEdit
          v-for="(episode, index) of serial.episodes"
          :key="episode.id"
          :episodeData="episode"
          :index="index"
          @updateEpisodesData="updateEpisodesData"
          @changeRemoveEpisodesArr="changeRemoveEpisodesArr"
        />

        <div class="show-serial__control">
          <button
            @click="addEpisode"
            class="show-serial__control-button button"
          >
            + Добавить эпизод
          </button>

          <div v-if="serial && serial.episodes.length > 0">
            <button
              @click="saveAndUpdateEpisodes"
              class="show-serial__control-button button"
            >
              Сохранить
            </button>
          </div>

          <button
            v-if="removeEpisodesId.length > 0"
            @click="removeEpisodes"
            class="show-serial__control-button button"
          >
            - Удалить эпизоды
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ISerial, MonthsEnum } from "@/modules/calendar/types";
import router from "@/router";
import { onMounted, ref } from "vue";
import adminService from "../services/AdminService";
import { ISerialEpisode } from "@/modules/calendar/types";
import EpisodeEdit from "@/modules/admin/components/EpisodeEdit.vue";

const serial = ref<ISerial>();
const episodes = ref<ISerialEpisode[]>();
const removeEpisodesId = ref<number[]>([]);

const title = ref("");
const imgLink = ref("");

onMounted(() => {
  getSerialById();
});

// Сериалы
const getSerialById = async () => {
  serial.value = await adminService.getSerialById(
    router.currentRoute.value.params.id as string
  );
  title.value = serial.value?.title;
  imgLink.value = serial.value?.img;
  episodes.value = serial.value?.episodes;
};

const updateSerial = async () => {
  try {
    const data = await adminService.updateSerialById(
      router.currentRoute.value.params.id as string,
      { title: title.value, img: imgLink.value }
    );

    if (serial.value) {
      serial.value.title = data.title;
      serial.value.img = data.img;
    }

    title.value = data.title;
    imgLink.value = data.img;
  } catch (error) {
    console.log("-->", error);
  }
};

const removeSerialById = async () => {
  if (confirm("Удалить?")) {
    try {
      await adminService.removeSerialById(+router.currentRoute.value.params.id);
      return router.push("/admin/serials");
    } catch (error) {
      console.log("-->", error);
    }
  }
};

// Добавление эпизодов
const addEpisode = () => {
  if (episodes.value !== undefined) {
    episodes.value.push({
      day: 5,
      month: MonthsEnum.August,
      title: "",
      year: 2022,
    });
  }
};

const saveEpisodes = async () => {
  try {
    if (serial.value?.id && episodes.value) {
      const arr = episodes.value.filter((item) => item.id === undefined);
      await adminService.addEpisodes(serial.value?.id, arr);
    }
  } catch (error) {
    console.log("-->", error);
  }
};

// Удаление упизодов
const changeRemoveEpisodesArr = (id: number) => {
  if (removeEpisodesId.value.includes(id)) {
    removeEpisodesId.value = removeEpisodesId.value.filter(
      (item) => item !== id
    );
  } else {
    removeEpisodesId.value.push(id);
  }
};

const removeEpisodes = async () => {
  if (confirm("Удалить эпизоды?")) {
    try {
      if (removeEpisodesId.value.length > 0) {
        const res = await adminService.removeEpisodes(removeEpisodesId.value);
        if (res) {
          await getSerialById();
        }
      }
      removeEpisodesId.value = [];
    } catch (error) {
      console.log("-->", error);
    }
  }
};

// Обновление эпизодов
const updateEpisodesData = (payload: any) => {
  if (episodes.value !== undefined) {
    episodes.value[payload.index] = payload.episodeData;
  }
};

const updateEpisodes = async () => {
  try {
    if (episodes.value !== undefined) {
      const arr = episodes.value.filter((item) => item.id !== undefined);
      await adminService.updateEpisodes(arr);
    }
  } catch (error) {
    console.log("-->", error);
  }
};

const saveAndUpdateEpisodes = async () => {
  await saveEpisodes();
  await updateEpisodes();
};
</script>

<style lang="scss" scoped>
@import url("../styles/main.scss");

.show-serial {
  padding: 50px 0;
}

.show-serial-label {
  display: block;
  margin-bottom: 15px;
}

.show-serial-label__title {
  color: var(--color-5);
  display: inline-block;
  margin-bottom: 4px;
}

.show-serial__img {
  margin: 0 auto;
  width: 100%;
  max-width: 300px;
  display: block;
}

.show-serial__control {
  display: flex;
  justify-content: center;
  align-items: center;
}

.show-serial__control-button {
  margin: 0 10px;
}

.episodes {
  margin-top: 50px;
}

.episodes__title {
  font-size: 20px;
  color: var(--color-5);
  margin-top: 50px;
  margin-bottom: 50px;
  text-align: center;
  text-transform: uppercase;
}
</style>
