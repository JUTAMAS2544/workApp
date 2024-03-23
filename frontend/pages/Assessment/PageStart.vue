<template>
  <v-container class="tw-flex tw-justify-center tw-items-center tw-h-full">
    <div class="tw-text-center tw-px-5">
      <p v-if="!score.getScore" class="tw-text-xl md:tw-text-3xl tw-mb-8 tw-font-bold">กรุณากดปุ่ม Start เพื่อเริ่มต้นทำแบบสอบถาม</p>
      <p v-else class="tw-text-xl md:tw-text-3xl tw-mb-8 tw-font-bold">กดที่ปุ่ม Start เพื่อเริ่มต้นทำแบบสอบถามใหม่<br/>หรือ กดที่ปุ่ม View เพื่อดูประวัติคะแนน</p>

      <div class="tw-grid tw-gap-x-16" :class="!score.getScore ? '':'tw-grid-cols-2'">
        <v-btn rounded="xl" size="x-large" color="#5BCE00" class="tw-text-white" block @click="goToAssessment">Start</v-btn>
        <v-btn v-if="score.getScore" rounded="xl" size="x-large" color="#00ABF5" block @click="goToSummary">View</v-btn>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { useScore } from '~/stores/score.store';

definePageMeta({
  middleware: ['auth']
})
const user = useUser();
const score = useScore();
const active = useActive()

const goToAssessment = () => {
  active.setCheckPage(true);
  navigateTo('/Assessment/Page-1')
}
const goToSummary = () => {
  navigateTo('/Assessment/Summary')
}

onMounted(async () => {
  if (user.getUserData) {
    // console.log("id:", user.getUserData.id)
    await score.setUserID(user.getUserData.id)
    await score.fetchScore(user.getUserData.id)
  }
})
</script>

<style scoped>

</style>