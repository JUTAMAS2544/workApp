<template>
  <v-table class="md:tw-mx-10 md:tw-text-base tw-text-base">
    <thead>
      <tr class="tw-bg-[#CBFF88] tw-h-auto md:tw-h-28">
        <th class="tw-py-5">
          <div class="tw-grid tw-grid-cols-1 tw-gap-2 md:tw-grid-cols-5 tw-items-center">
            <p class="md:tw-col-span-3">{{ prop.detail[0].text }}</p>
            <span class="md:tw-text-center md:tw-col-span-2">
              <b>เกณฑ์คะแนน</b><br/>(1 = น้อยที่สุด, 2 = น้อย, 3 = ปานกลาง, 4 = มาก, 5 = มากที่สุด)
            </span>
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(value, questionKey) in prop.detail" :key="questionKey">
        <td v-if="questionKey !== 0" class="tw-text-left tw-py-5">
          <div class="tw-grid tw-grid-cols-1 tw-gap-2 md:tw-grid-cols-5">
            <p class="md:tw-col-span-3">{{ value.text }}</p>
            <v-radio-group v-model="answers[`question_${questionKey}`]" inline class="md:tw-col-span-2 md:tw-ml-3 md:tw-flex md:tw-justify-center">
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
import type { QuestionType } from '~/types/question';
import type { ScoreType, SendType } from '~/types/score';

interface Props {
  detail: QuestionType[]
}
const prop = defineProps<Props>()
const answers = ref<Record<string, number>>({})
const score = useScore()

// const test = computed(() => {
//   const listQuestionID = prop.detail.slice(1).map((value: QuestionType) => {
//     return value.id
//   })
//   return listQuestionID
// })

// const test2 = computed(() => {
//   if (Object.keys(answers.value).length === 4) {
//     const list = ref<SendType[]>([])
//     for (let index = 0; index < Object.keys(answers.value).length; index++) {
//       const ele = {
//         questionId: test.value[index],
//         value: answers.value[Object.keys(answers.value)[index]]
//       }
//       list.value.push(ele);
//       console.log("Hi", ele)
//     }
//     return list.value
//   }
//   return []
// })

watchEffect(async () => {
  if (answers.value) {
    if (prop.detail[0].category === 'TC') {
      await score.setScoreTC(answers.value, prop.detail.slice(1))
    }
    if (prop.detail[0].category === 'SP') {
      score.setScoreSP(answers.value, prop.detail.slice(1))
    }
    if (prop.detail[0].category === 'IT') {
      score.setScoreIT(answers.value, prop.detail.slice(1))
    }
    if (prop.detail[0].category === 'EC') {
      score.setScoreEC(answers.value, prop.detail.slice(1))
    }
  }
})

</script>

<style scoped>

</style>