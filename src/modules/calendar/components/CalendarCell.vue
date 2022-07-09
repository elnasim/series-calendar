<template>
  <td class="h-36 p-1" :style="cellsSize()">
    <div
      class="w-full h-full relative bg-color-2 rounded-2xl overflow-hidden"
      v-if="props.dayData"
    >
      <div
        :class="isCurrentDay && `bg-red`"
        class="absolute top-1 right-1 w-5 h-5 bg-color-1 text-color-5 rounded-full flex justify-center items-center text-xs font-bold z-[1]"
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
          :class="
            !isShowOnlyLastEpisodes || item.is_last_season_episode === 1
              ? 'w-full h-full'
              : ''
          "
        >
          <div
            v-if="!isShowOnlyLastEpisodes || item.is_last_season_episode === 1"
            class="w-full h-full bg-cover bg-repeat flex items-end p-1 relative mb-0.5 last:mb-0"
            :style="`background-image: url('${item.serial?.img}');`"
          >
            <div
              class="absolute inset-0 flex items-end p-0.5 bg-gradient-to-t from-color-1 to-transparent"
            >
              <div
                class="flex items-center overflow-hidden truncate text-color-5 text-xs rounded-md pl-1 pr-1"
              >
                <span
                  v-if="item.serial.imdb && item.serial.imdb > 0"
                  class="w-1.5 h-1.5 rounded-full inline-block mr-1"
                  :class="bgTitleColorByRating(item.serial.imdb)"
                ></span>
                {{ item.serial?.title }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </td>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { TDay } from "@/modules/calendar/types";

// eslint-disable-next-line no-undef
const props = defineProps<{
  dayData: TDay;
  month: number;
  isShowOnlyLastEpisodes: boolean;
}>();

const cellsSize = () => {
  // if (props.dayData && props.dayData.content.length > 1) {
  //   return `width: 20%`;
  // }

  return ``;
};

const dayDataWithoutRepeatedSerial = computed(() => {
  // TODO Продумать фильтрацию. Сейчас могут появиться 2 серии одного сериала, если одна из серий завершает сезон
  const lastEpisodes = props.dayData?.content.filter((item) => {
    return item.is_last_season_episode === 1;
  });

  const notLastEpisodes = props.dayData?.content.filter((item) => {
    return item.is_last_season_episode !== 1;
  });

  const serialIds = notLastEpisodes?.map((o) => o.serial_id);
  const filtered = notLastEpisodes?.filter(
    ({ serial_id }, index) => !serialIds?.includes(serial_id, index + 1)
  );

  if (lastEpisodes && filtered) {
    return [...lastEpisodes, ...filtered];
  }

  return [];
});

const isCurrentDay = computed(() => {
  const date = new Date();
  return (
    props.dayData?.dayInfo.dayIndex === date.getDate() &&
    props.month === date.getMonth()
  );
});

const bgTitleColorByRating = (rating: number) => {
  if (rating < 2) {
    return "bg-rating-1";
  }
  if (rating < 4) {
    return "bg-rating-2";
  }
  if (rating < 6) {
    return "bg-rating-3";
  }
  if (rating < 7) {
    return "bg-rating-4";
  }
  if (rating < 8) {
    return "bg-rating-5";
  }
  if (rating < 9) {
    return "bg-rating-6";
  }
  if (rating <= 10) {
    return "bg-rating-7";
  }
};
</script>
