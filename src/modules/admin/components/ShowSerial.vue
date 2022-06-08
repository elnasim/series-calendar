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

        <div
          v-for="episode of serial.episodes"
          :key="episode.id"
          class="episode"
        >
          <div class="episode__col">
            <div class="episode__edit">
              <input
                class="edit-input"
                type="text"
                placeholder="Название серии"
              />
              <input class="edit-input" type="text" placeholder="День" />
              <input class="edit-input" type="text" placeholder="Месяц" />
              <input class="edit-input" type="text" placeholder="Год" />
            </div>

            <div class="episode__show-info">
              <div class="episode__title">{{ episode.title }}</div>
              <div class="episode__date">
                {{ episode.day }} {{ episode.month }} {{ episode.year }}
              </div>
            </div>
          </div>

          <div class="episode__control">
            <button @click="removeEpisode(episode.id)" class="button">
              Удалить
            </button>
          </div>
        </div>

        <div class="show-serial__control">
          <button
            @click="isAddNewEpisode = true"
            class="show-serial__control-button button"
          >
            + Добавить эпизод
          </button>
        </div>

        <div class="show-serial__control">
          <div v-if="serial && serial.episodes.length > 0">
            <button
              @click="updateEpisodes"
              class="show-serial__control-button button"
            >
              Сохранить
            </button>

            <button class="show-serial__control-button button">
              Редактировать
            </button>
          </div>
        </div>
      </div>

      <AddNewEpisode v-if="isAddNewEpisode" @addEpisode="addEpisode" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ISerial } from "@/modules/calendar/interfaces";
import router from "@/router";
import { onMounted, ref } from "vue";
import adminService from "../services/AdminService";
import AddNewEpisode from "./AddNewEpisode.vue";
import { IEditSerial } from "@/modules/admin/types";
import { ISerialEpisode } from "@/modules/calendar/interfaces";

const serial = ref<ISerial>();
const episodes = ref<ISerialEpisode[]>();
const isAddNewEpisode = ref(false);

const title = ref("");
const imgLink = ref("");

onMounted(() => {
  getSerialById();
});

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
      await adminService.removeSerialById(
        router.currentRoute.value.params.id as string
      );
      return router.push("/admin/serials");
    } catch (error) {
      console.log("-->", error);
    }
  }
};

const updateEpisode = async (episodeId: number, payload: IEditSerial) => {
  try {
    const res = await adminService.updateEpisode(episodeId, payload);
  } catch (e) {
    console.log("-->", e);
  }
};

const addEpisode = async (payload: IEditSerial) => {
  try {
    serial.value = await adminService.addEpisode(
      router.currentRoute.value.params.id as string,
      [payload]
    );

    isAddNewEpisode.value = false;
  } catch (error) {
    console.log("-->", error);
  }
};

const removeEpisode = async (episodeId: number) => {
  if (confirm("Удалить эпизод?")) {
    try {
      const res = await adminService.removeEpisode(episodeId);
      if (res) {
        await getSerialById();
      }
    } catch (error) {
      console.log("-->", error);
    }
  }
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
