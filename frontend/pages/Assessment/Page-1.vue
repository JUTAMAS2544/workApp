<template>
  <Loading :loading="isLoading" />
  <v-stepper v-model="e1" class="tw-w-full tw-h-full tw-bg-[#EAFFE0]" alt-labels>
    <template v-slot:default="{ prev, next }">
      <v-stepper-header class="tw-shadow-none md:tw-px-56 tw-bg-white">
        <template v-for="n in steps" :key="`${n}-step`">
          <v-stepper-item
            :complete="e1 > n"
            :value="n"
            :color="e1 > n ? '#C2E829' : '#268D49'"
          ></v-stepper-item>

          <v-divider
            v-if="n !== steps"
            :key="n"
            :thickness="2"
            class="tw-opacity-100"
          ></v-divider>
        </template>
      </v-stepper-header>

      <v-stepper-window class="test">
        <v-stepper-window-item v-for="n in steps" :key="`${n}-content`" :value="n">
          <div class="tw-bg-white tw-w-full">asas</div>
          <v-card color="#EAFFE0">
            <v-card-title class="tw-text-center">
              <p class="tw-text-sm md:tw-text-xl tw-font-semibold">กรุณาเลือกคะแนนที่ตรงกับความคิดเห็นของท่าน</p>
            </v-card-title>
            <v-card-text v-if="tc" class="tw-text-center">
              <QuestionTable :detail="tc" />
            </v-card-text>
          </v-card>
        </v-stepper-window-item>
      </v-stepper-window>

      <v-stepper-actions
        :disabled="disabled"
        @click:next="next"
        @click:prev="prev"
        class="tw-justify-center tw-gap-6"
      >
      <template v-slot:prev>
        <v-btn variant="flat" rounded="xl" color="#006A24" class="tw-w-32" @click="prev" :disabled="disabled === 'prev'">
          Back
        </v-btn>
      </template>
      <template v-slot:next>
        <v-btn v-if="e1 === 4" variant="flat" rounded="xl" color="#FFC700" :disabled="disabled === false" class="tw-w-32 tw-text-white" @click="submit">
          Submit
        </v-btn>
        <v-btn v-else variant="flat" rounded="xl" color="#00ABF5" class="tw-w-32" @click="next" :disabled="disabled === 'next'">
          Next
        </v-btn>
      </template>
      </v-stepper-actions>
    </template>
  </v-stepper>
</template>

<script setup lang="ts">
import { useQuestion } from '~/stores/question.store';
import type { QuestionTC } from '~/types/question';

definePageMeta({
  middleware: ['auth']
})

const question = useQuestion()
const isLoading = ref(false)
const tc = computed(() => question.getQuestionTC)
const e1 = ref(1);
const steps = ref(4);
const disabled = computed(() => {
  return e1.value === 1 ? "prev"
    : e1.value === steps.value ? "next"
    : e1.value === 4 ? false
    : undefined;
});

const submit = () => {
  console.log("submit");
};

onMounted(async ()=> {
  isLoading.value = true
  await question.fetchQuestionTC()
  isLoading.value = false
})
</script>

<style scoped>
.v-stepper-window {
  margin: 0px !important;
}
</style>
