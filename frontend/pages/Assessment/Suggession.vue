<template>
  <Loading :loading="isLoading" />
  <div v-if="data" class="tw-mt-10 tw-mx-5 md:tw-mx-20">
    <p class="md:tw-text-2xl tw-font-bold tw-text-center md:tw-mb-10 tw-mb-5">คำแนะนำ</p>
    <template v-for="i in data.suggesstions" :key="i.topic">
      <div class="tw-grid tw-grid-cols-4 md:tw-grid-cols-5 tw-w-full tw-border-b-2" :class="i.topic[1] === 'n' ? 'tw-bg-[#FF7A00]': 'tw-bg-[#FFC700]'">
        <div class="tw-col-span-3 md:tw-col-span-4 tw-p-3 md:tw-px-6 md:tw-py-3">
          <p class="tw-text-xs md:tw-text-lg tw-font-semibold">
            {{ i.topic_th }}
          </p>
          <p class="tw-text-[10px] md:tw-text-base tw-font-semibold tw-mt-1">
            {{ i.topic }}
          </p>
        </div>
        <div class="tw-text-sm md:tw-text-2xl tw-font-semibold tw-flex tw-items-center tw-justify-end tw-p-3 md:tw-p-6">
          <p>
            <span v-if="i.topic[1] === 'n'">{{ data.score.toFixed(2) }}</span>
            <span v-if="i.topic[1] === 'r'">{{ data.tc.toFixed(2) }}</span>
            <span v-if="i.topic[1] === 'm'">{{ data.sp.toFixed(2) }}</span>
            <span v-if="i.topic[1] === 'o'">{{ data.it.toFixed(2) }}</span>
            <span v-if="i.topic[1] === 'g'">{{ data.ec.toFixed(2) }}</span>%
          </p>
        </div>
      </div>
      <div class="tw-border-b-2 tw-p-3 tw-text-xs md:tw-text-base md:tw-px-6 md:tw-py-4 tw-bg-[#FFFCDE]">
        {{ i.content }}
      </div>
    </template>
    <div class="tw-text-center tw-my-10">
      <v-btn rounded="xl" size="x-large" color="#00ABF5" class="tw-text-white" @click="goToPlans">คลิกเพื่อรับคำปรึกษาเชิงลึก</v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  middleware: ['auth']
})
const score = useScore();
const isLoading = ref(false);

const data = computed(() => {
  if (score.getSuggession) return score.getSuggession;
  return null;
})

const goToPlans = () => {
  navigateTo('/Pricing')
}

onMounted(async () => {
  isLoading.value = true;
  await score.fetchSuggession();
  isLoading.value = false;
});

</script>

<style scoped>

</style>