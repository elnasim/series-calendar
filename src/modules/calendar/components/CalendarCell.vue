<template>
  <td :style="cellsSize()">
    <div class="calendar-cell">
      <div class="calendar-cell__inner" v-if="props.dayData">
        <div class="calendar-cell__date-number">
          {{ props.dayData?.dayInfo.dayIndex }}
        </div>
        <div class="calendar-cell__content">
          <div
            v-for="item of props.dayData.content"
            :key="item.id"
            class="calendar-cell__movie"
            :style="`background-image: url(${item.img});`"
          >
            <div class="movie-title">{{ item.title }}</div>
          </div>
        </div>
      </div>
    </div>
  </td>
</template>

<script lang="ts" setup>
import { TDay } from "../interfaces";

// eslint-disable-next-line no-undef
const props = defineProps<{
  dayData: TDay;
}>();

const cellsSize = () => {
  if (props.dayData && props.dayData.content.length > 1) {
    return `width: calc(100% / 7 * ${props.dayData?.content?.length})`;
  }

  return `width: calc(100% / 7)`;
};
</script>

<style scoped lang="scss">
.calendar-cell {
  width: 100%;
  height: 100px;
}

.calendar-cell__inner {
  border: 1px solid black;
  height: 100%;
  position: relative;
}

.calendar-cell__date-number {
  position: absolute;
  top: 5px;
  left: 5px;
  width: 20px;
  height: 20px;
  background-color: #000;
  color: #fff;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
}

.calendar-cell__content {
  height: 100%;
  display: flex;
}

.calendar-cell__movie {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
  padding: 4px;
}

.movie-title {
  background-color: #fff;
  padding: 3px;
  border-radius: 4px;
}
</style>
