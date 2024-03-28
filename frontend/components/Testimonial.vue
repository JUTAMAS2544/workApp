<template>
  <div class="tw-relative">
    <div class="tw-flex tw-justify-center tw-items-center tw-gap-x-8 tw-absolute tw-z-10 tw-w-full" >
      <img src="/egg-1.png" alt="Testimonial" class="tw-h-10 md:tw-h-12" >
      <img :src="prop.image" alt="Testimonial" class="tw-max-h-32 md:tw-max-h-48" >
      <img src="/egg-2.png" alt="Testimonial" class="tw-h-10 md:tw-h-12" >
    </div>
    <div class="tw-bg-[#CAFFB2] tw-w-full tw-rounded-3xl tw-absolute tw-top-16 md:tw-top-24 tw-z-0 tw-h-3/4 tw-px-6 md:tw-px-12 tw-pt-20 md:tw-pt-32 tw-pb-5 " >
      <p class="tw-text-[#3F3C00] tw-text-center md:tw-text-[19px] tw-whitespace-pre-line">
        {{ prop.text }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  text: string;
  image: string;
}

const prop = defineProps<Props>()

</script>

<style scoped>

</style>