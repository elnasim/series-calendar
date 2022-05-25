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
  padding: 2px;
}

.calendar-cell__inner {
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
}

.calendar-cell__content {
  height: 100%;
  position: relative;
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
  // white-space: nowrap;
  // overflow: hidden;
  // text-overflow: ellipsis;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: flex-end;
  background: linear-gradient(
    0deg,
    rgba(34, 34, 59, 1) 0%,
    rgba(0, 212, 255, 0) 100%
  );
  color: var(--color-4);
  padding: 4px 2px;
}
</style>
