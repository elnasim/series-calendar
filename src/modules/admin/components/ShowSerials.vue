<template>
  <div class="show-serials">
    <div class="container">
      <h1 class="title">Сериалы</h1>

      <div class="serials">
        <div
          v-for="serial of serials"
          :key="serial.id"
          class="serials-item-col"
        >
          <router-link :to="`/admin/serials/${serial.id}`" class="serial-item">
            <div
              class="serial-item__img"
              :style="`background-image: url(${serial.img})`"
            ></div>
            <div class="serial-item__title">
              {{ serial.title }}
            </div>
          </router-link>
        </div>
      </div>

      <router-link to="/admin/add" class="button">
        Добавить сериал
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { ISerial } from "@/modules/calendar/types";
import adminService from "@/modules/admin/services/AdminService";

const serials = ref<ISerial[] | null>([]);

// Mounted
onMounted(() => {
  getAllSerials();
});

const getAllSerials = async () => {
  const data = await adminService.getAllSerials();
  serials.value = data;
};
</script>

<style lang="scss" scoped>
@import url("../styles/main.scss");
.show-serials {
  padding: 50px 0;
}

.serials {
  display: flex;
  flex-wrap: wrap;
}

.serials-item-col {
  padding: 0 15px;
  margin-bottom: 50px;
  width: calc(100% / 3);
}

.serial-item {
  display: block;
  background-color: var(--color-2);
  border-radius: 5px;
  overflow: hidden;
}

.serial-item__img {
  height: 200px;
  background-size: cover;
  background-position: center;
}

.serial-item__title {
  padding: 10px;
  text-decoration: none;
  color: #ffffff;
}
</style>
