<template>
  <td class="h-36 p-1" :style="cellsSize()">
    <div
      class="w-full h-full relative bg-color-2 rounded-2xl overflow-hidden"
      v-if="props.dayData"
    >
      <div
        class="absolute top-1 left-1 w-5 h-5 bg-color-1 text-color-4 rounded-full flex justify-center items-center text-xs font-bold z-[1]"
      >
        {{ props.dayData?.dayInfo.dayIndex }}
      </div>

      <div
        class="h-full flex flex-col"
        v-if="
          dayDataWithoutRepeatedSerial &&
          dayDataWithoutRepeatedSerial.length > 0
        "
      >
        <div
          v-for="item of dayDataWithoutRepeatedSerial"
          :key="item.id"
          class="w-full h-full bg-cover bg-repeat flex items-end p-1 relative mb-0.5 last:mb-0"
          :style="`background-image: url(${item.serial?.img});`"
        >
          <div
            class="absolute inset-0 flex items-end p-0.5 bg-gradient-to-t from-color-1 to-transparent"
          >
            <div class="w-11/12 overflow-hidden truncate text-color-5 text-xs">
              {{ item.serial?.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </td>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { ISerialEpisodeWithSerialInfo, TDay } from "../types";

// eslint-disable-next-line no-undef
const props = defineProps<{
  dayData: TDay;
}>();

const cellsSize = () => {
  // if (props.dayData && props.dayData.content.length > 1) {
  //   return `width: 20%`;
  // }

  return ``;
};

const dayDataWithoutRepeatedSerial = computed(() => {
  if (props.dayData) {
    const serialIds = props.dayData.content.map((o) => o.serial_id);
    const filtered = props.dayData.content.filter(
      ({ serial_id }, index) => !serialIds.includes(serial_id, index + 1)
    );

    return filtered;
  }

  return null;
});
</script>
