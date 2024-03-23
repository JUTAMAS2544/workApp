<template>
  <v-table class="md:tw-mx-10 md:tw-text-base tw-text-base">
    <thead>
      <tr class="tw-bg-[#CBFF88] tw-h-auto md:tw-h-28">
        <th class="tw-py-5">
          <div class="tw-grid tw-grid-cols-1 tw-gap-2 md:tw-grid-cols-5">
            <p class="md:tw-col-span-3">{{ prop.detail.title }}</p>
            <span class="md:tw-text-center md:tw-col-span-2">
              <b>เกณฑ์คะแนน</b><br/>(1 = น้อยที่สุด, 2 = น้อย, 3 = ปานกลาง, 4 = มาก, 5 = มากที่สุด)
            </span>
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(value, questionKey) in prop.detail" :key="questionKey">
        <td v-if="questionKey[0] === 'q'" class="tw-text-left tw-py-5">
          <div class="tw-grid tw-grid-cols-1 tw-gap-2 md:tw-grid-cols-5">
            <p class="md:tw-col-span-3">{{ value }}</p>
            <v-radio-group v-model="answers[questionKey]" inline class="md:tw-col-span-2 md:tw-ml-3 md:tw-flex md:tw-justify-center">
            <v-radio label="1" class="tw-mr-5 md:tw-mr-3" color="success" :value="1"></v-radio>
            <v-radio label="2" class="tw-mr-5 md:tw-mr-3" color="success" :value="2"></v-radio>
            <v-radio label="3" class="tw-mr-5 md:tw-mr-3" color="success" :value="3"></v-radio>
            <v-radio label="4" class="tw-mr-5 md:tw-mr-3" color="success" :value="4"></v-radio>
            <v-radio label="5" color="success" :value="5"></v-radio>
          </v-radio-group>
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
import type { Answer, QuestionEC, QuestionIT, QuestionSP, QuestionTC } from '~/types/question';
import type { ScoreEC, ScoreIT, ScoreSP, ScoreTC } from '~/types/score';

interface Props {
  detail: QuestionTC | QuestionSP | QuestionIT | QuestionEC
  text: string
}
const prop = defineProps<Props>()
const answers = ref<Record<string, number>>({})
// const answers = ref<ScoreTC | ScoreSP | ScoreIT | ScoreEC>()
const score = useScore()

watchEffect(() => {
  if (answers.value) {
    if (prop.text === 'tc') {score.setScoreTC(answers.value)}
    if (prop.text ==='sp') {score.setScoreSP(answers.value)}
    if (prop.text === 'it') {score.setScoreIT(answers.value)}
    if (prop.text === 'ec') {score.setScoreEC(answers.value)}
  }
})

</script>

<style scoped>

</style>