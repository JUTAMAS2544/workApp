<template>
  <div class="tw-bg-white tw-w-full tw-text-center tw-px-3">
    <p class="tw-text-[#0F665C] tw-text-lg md:tw-text-2xl tw-font-semibold">{{ prop.data.titleTH }}</p>
    <p class="tw-text-[#0F665C] tw-text-lg md:tw-text-2xl tw-font-semibold">{{ prop.data.titleEN }}</p>
    <div class="tw-flex tw-justify-center tw-my-8">
      <img :src="prop.data.image" alt="" class="md:tw-h-[320px] tw-h-48">
    </div>
    <div class="tw-pb-10 md:tw-text-xl md:tw-whitespace-pre-line">{{ prop.data.detail }}</div>
  </div>
</template>

<script setup lang="ts">
import type { IndexType } from '~/types/user';

interface Props {
  data: IndexType
}
const prop = defineProps<Props>()

</script>

<style scoped>

</style>