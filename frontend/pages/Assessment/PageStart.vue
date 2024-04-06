<template>
  <v-container class="tw-flex tw-justify-center tw-items-center tw-h-full">
    <div class="tw-text-center tw-px-5">
      <p v-if="!checkScore" class="md:tw-text-3xl tw-mb-8 tw-font-bold">กรุณากดปุ่ม Start เพื่อเริ่มต้นทำแบบสอบถาม</p>
      <p v-else class="md:tw-text-3xl tw-mb-8 tw-font-bold">กดปุ่ม Start เพื่อเริ่มต้นทำแบบสอบถามใหม่<br/>หรือ กดปุ่ม View เพื่อดูประวัติคะแนน</p>

      <div class="tw-grid tw-gap-x-5 md:tw-gap-x-16" :class="!checkScore ? '':'tw-grid-cols-2'">
        <v-btn rounded="xl" size="x-large" color="#5BCE00" class="tw-text-white" @click="goToAssessment">Start</v-btn>
        <v-btn v-if="checkScore" rounded="xl" size="x-large" color="#00ABF5" @click="goToSummary">View</v-btn>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { useScore } from '~/stores/score.store';

definePageMeta({
  middleware: ['auth']
})
const score = useScore();
const active = useActive()

const checkScore = computed(() => {
  if (score.getScore && score.getScore.length > 0) return true;
  return false;
})

const goToAssessment = () => {
  active.setCheckPage(true);
  navigateTo('/Assessment/Page-1')
}
const goToSummary = () => {
  navigateTo('/Assessment/Summary')
}

onMounted(async () => {
  const token = localStorage.getItem('token');
  await score.fetchScore(token as string)
})
</script>

<style scoped>

</style>