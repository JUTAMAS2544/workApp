<template>
  <div class="tw-bg-[#94892B] tw-rounded-3xl tw-p-5 md:tw-p-6">
    <p class="tw-mb-6">{{ prop.index }}</p>
    <p class="tw-capitalize tw-tracking-wider tw-font-semibold tw-text-sm md:tw-text-base tw-h-32 md:tw-h-40 tw-whitespace-pre-line">
      {{ prop.title }}
    </p>
    <img :src="prop.image" class="tw-max-h-20">
  </div>
</template>

<script setup lang="ts">
interface Props {
  index: string;
  title: string;
  image: string;
}

const prop = defineProps<Props>()
</script>

<style scoped>

</style>