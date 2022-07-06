<template>
  <td class="calendar-td" :style="cellsSize()">
    <div class="calendar-cell" v-if="props.dayData">
      <div class="calendar-cell__date-number">
        {{ props.dayData?.dayInfo.dayIndex }}
      </div>
      <div class="calendar-cell__content" v-if="props.dayData?.content.length">
        <div
          v-for="item of props.dayData.content"
          :key="item.id"
          class="calendar-cell__movie"
          :style="`background-image: url(${item.serial?.img});`"
        >
          <div class="movie-title-wrapper">
            <div class="movie-title">{{ item.serial?.title }}</div>
          </div>
        </div>
      </div>
    </div>
  </td>
</template>

<script lang="ts" setup>
import { TDay } from "../types";

// eslint-disable-next-line no-undef
const props = defineProps<{
  dayData: TDay;
}>();

const cellsSize = () => {
  if (props.dayData && props.dayData.content.length > 1) {
    return `width: 20%`;
  }

  return ``;
};
</script>

<style scoped lang="scss">
.calendar-td {
  height: 140px;
  padding: 4px;
}

.calendar-cell {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: var(--color-2);
  border-radius: 20px;
  overflow: hidden;
}

.calendar-cell__date-number {
  position: absolute;
  top: 5px;
  left: 5px;
  width: 20px;
  height: 20px;
  background-color: var(--color-1);
  color: var(--color-4);
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  z-index: 1;
}

.calendar-cell__content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.calendar-cell__movie {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: flex-end;
  padding: 4px;
  position: relative;
  margin-bottom: 2px;

  &:last-child {
    margin-bottom: 0;
  }
}

.movie-title-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: flex-end;
  padding: 2px;
  background: linear-gradient(0deg, rgba(#22223b, 1) 0%, rgba(#22223b, 0) 100%);
}

.movie-title {
  width: 95%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: white;
  font-size: 14px;
}
</style>
