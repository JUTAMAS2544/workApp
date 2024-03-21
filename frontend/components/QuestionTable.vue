<template>
  {{ radios }}
  <v-table class="md:tw-mx-10 md:tw-text-base tw-text-base">
    <thead>
      <tr class="tw-bg-[#CBFF88] tw-h-36 md:tw-h-28">
        <th class="tw-text-left tw-w-3/4 md:tw-w-3/5">
          {{ prop.detail.title }}
        </th>
        <th class="tw-text-center tw-items-center tw-border-none tw-text-xs md:tw-text-base">
          <span>
            เกณฑ์คะแนน<br/>(1 = น้อยที่สุด, 2 = น้อย, 3 = ปานกลาง, 4 = มาก, 5 = มากที่สุด)
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(i, index) in prop.detail" :key="index">
        <td v-if="index[0] === 'q'" class="tw-text-left tw-py-5">{{ i }}{{ index }}</td>
        <td v-if="index[0] === 'q'" class="tw-py-5">
          <v-radio-group inline class="tw-flex tw-justify-center">
            <v-radio label="1" class="md:tw-mr-3" color="success" :value="1"></v-radio>
            <v-radio label="2" class="md:tw-mr-3" color="success" :value="2"></v-radio>
            <v-radio label="3" class="md:tw-mr-3" color="success" :value="3"></v-radio>
            <v-radio label="4" class="md:tw-mr-3" color="success" :value="4"></v-radio>
            <v-radio label="5" color="success" :value="5"></v-radio>
          </v-radio-group>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
import type { QuestionTC } from '~/types/question';

interface Props {
  detail: QuestionTC
}
const prop = defineProps<Props>()
const radios = ref(0)
const answers = {
  1: 'น้อยที่สุด',
  2: 'น้อย',
  3: 'ปานกลาง',
  4: 'มา��',
  5: 'มา��ที่สุด'
}

</script>

<style scoped>

</style>