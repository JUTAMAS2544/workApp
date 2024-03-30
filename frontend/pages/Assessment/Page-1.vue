<template>
  <div class="tw-relative">
    <Loading :loading="isLoading" />
    <!-- Alert -->
    <v-snackbar
      v-model="alertCheckScore"
      class="tw-mt-16"
      location="top right"
      color="#FF3D00"
      :timeout="5000"
      multi-line
    >
      <div class="tw-flex tw-gap-3">
        <v-icon size="x-large" icon="mdi-alert-circle"></v-icon>
        <div>
          <p class="tw-text-lg tw-font-semibold">ท่านยังเลือกคำตอบไม่ครบ</p>
          <p>กรุณาตรวจสอบ
            <span v-if="!score.getCheckScoreTC" class="tw-font-semibold">คำถามหน้าที่ 1 </span>
            <span v-if="!score.getCheckScoreSP" class="tw-font-semibold">คำถามหน้าที่ 2 </span>
            <span v-if="!score.getCheckScoreIT" class="tw-font-semibold">คำถามหน้าที่ 3 </span>
            <span v-if="!score.getCheckScoreEC" class="tw-font-semibold">คำถามหน้าที่ 4 </span>
          </p>
        </div>
      </div>

      <template v-slot:actions>
        <v-btn
          color="white"
          variant="text"
          class="tw-text-base"
          @click="alertCheckScore = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <!-- Step -->
    <v-stepper v-model="e1" class="tw-w-full tw-h-full tw-bg-[#EAFFE0]" alt-labels>
      <template v-slot:default="{ prev, next }">
        <v-stepper-header class="tw-shadow-none md:tw-px-56 tw-bg-white md:tw-pt-7">
          <template v-for="n in steps" :key="`${n}-step`">
            <v-stepper-item
              :complete="e1 > n"
              :value="n"
              :color="e1 > n ? '#C2E829' : '#268D49'"
            ></v-stepper-item>

            <v-divider
              v-if="n !== steps"
              :key="n"
              :thickness="4"
              class="tw-opacity-100"
            ></v-divider>
          </template>
        </v-stepper-header>

        <v-stepper-window class="tw-shadow-none">
          <v-stepper-window-item v-for="n in steps" :key="`${n}-content`" :value="n">
            <QuestionHead :data="dataDetail[n-1]" />
            <v-card color="#EAFFE0">
              <v-card-title class="tw-text-center tw-mt-11 tw-mb-5">
                <p class="tw-text-base md:tw-text-2xl tw-font-semibold">กรุณาเลือกคะแนนที่ตรงกับความคิดเห็นของท่าน</p>
              </v-card-title>
              <v-card-text class="tw-text-center">
                <QuestionTable v-if="n===1 && questionTC" :detail="questionTC" />
                <QuestionTable v-if="n===2 && questionSP" :detail="questionSP" />
                <QuestionTable v-if="n===3 && questionIT" :detail="questionIT" />
                <QuestionTable v-if="n===4 && questionEC" :detail="questionEC" />
              </v-card-text>
            </v-card>
          </v-stepper-window-item>
        </v-stepper-window>

        <v-stepper-actions
          :disabled="disabled"
          @click:next="next"
          @click:prev="prev"
          class="tw-justify-center tw-gap-6 tw-shadow-none tw-my-5"
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

    <!-- Dialog -->
    <v-dialog v-model="show" persistent width="auto">
      <v-card class="tw-py-6 md:tw-px-10 md:tw-py-12 tw-rounded-3xl">
        <v-card-text class="tw-text-center">
          <p class="md:tw-text-xl tw-font-semibold tw-mb-2">คุณยืนยันที่จะออกจากหน้านี้ใช่หรือไม่ ?</p>
          <p class="tw-text-xs md:tw-text-base tw-text-[#FF5353]">หากออกจากหน้านี้ ระบบจะไม่ทำการบันทึกคำตอบของคุณ</p>
          <div class="tw-mt-8 tw-grid tw-grid-cols-2 tw-gap-x-6">
            <v-btn rounded="xl" size="large" color="#E60000" block @click="menu.setShowChangePage(false)">Cancel</v-btn>
            <v-btn rounded="xl" size="large" color="#5BCE00" block class="tw-text-white" @click="handleCheckPage">ok</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { useQuestion } from '~/stores/question.store';
import type { QuestionType } from '~/types/question';
import type { SendType } from '~/types/score';
// import type { ScoreSendType } from '~/types/score';

definePageMeta({
  middleware: ['auth']
})

const question = useQuestion()
const score = useScore()
const menu = useActive();
const user = useUser();

// const questionList = computed(() => question.getQuestion)
// const questionList = computed(() => question.getQuestion)
const show = computed(() => menu.getShowChangePage)

const isLoading = ref(false)
const alertCheckScore = ref(false)
const answers = ref<SendType[]>()

const dataDetail = [
  {
    titleTH: 'เทคโนโลยีบล็อกเชนที่ใช้ในการตรวจสอบย้อนกลับและการรับรองมาตรฐาน',
    titleEN: '(Blockchain food traceability and certification technology)',
    image: '/p1.png',
    detail: 'เทคโนโลยีที่เป็นระบบในการติดตามที่มาของผลไม้สดในการไปใช้เพื่อการบริโภค\nตลอดทุกขั้นตอนของการผลิต การแปรรูป และการจัดจำหน่ายที่ผ่านการรับรอง\nตามมาตรฐานสากลทางอาหาร'
  },
  {
    titleTH: 'เทคโนโลยีบรรจุภัณฑ์สมาร์ท',
    titleEN: '(Smart packaging technology)',
    image: '/p2.png',
    detail: 'เทคโนโลยีในอุตสาหกรรมบรรจุภัณฑ์อาหารที่ช่วยให้รักษาคุณภาพ\nของผลไม้ให้สดใหม่ยาวนานขึ้น และมีข้อมูลที่สำคัญแก่ผู้บริโภค\nเช่น ตัวบ่งชี้ ความสดใหม่และความสุกงอมของผลไม้ เป็นต้น'
  },
  {
    titleTH: 'เทคโนโลยีไอโอทีเซ็นเซอร์ในการควบคุมคุณภาพและความปลอดภัย',
    titleEN: '(IoT sensor in quality and safety control technology)',
    image: '/p3.png',
    detail: 'เทคโนโลยีด้านเซนเซอร์ที่ใช้ควบคุมคุณภาพและความปลอดภัยของ\nผลไม้สดในแต่ละห่วงโซ่อุปทาน ตั้งแต่แหล่งผลิตจนถึงจุดขาย\nผ่านเครือข่ายอินเตอร์เน็ต'
  },
  {
    titleTH: 'เทคโนโลยีการซื้อขายผลไม้ผ่านระบบพาณิชย์อิเล็กทรอนิกส์',
    titleEN: '(Agrifood E-Commerce technology)',
    image: '/p4.png',
    detail: 'เทคโนโลยีอีคอมเมิร์สที่ผู้บริโภคสามารถสั่งซื้อผลไม้สดผ่านแพลตฟอร์ม\nออนไลน์ที่ให้ความสะดวกและให้ข้อมูลต่างๆ ที่สำคัญของสินค้า\nที่มีมาตรฐานพร้อมส่งตรงถึงที่หมายโดยตรง'
  }
]

const e1 = ref(1);
const steps = ref(4);
const disabled = computed(() => {
  return e1.value === 1 ? "prev"
    : e1.value === steps.value ? "next"
    : e1.value === 4 ? false
    : undefined;
});

const questionTC = computed(() => {
  if (question.getQuestion) {
    const listQ = question.getQuestion.filter((q: QuestionType) => {
      if (q.category === 'TC') {
        return q
      }
    })
    return listQ
  }
})

const questionSP = computed(() => {
  if (question.getQuestion) {
    const listQ = question.getQuestion.filter((q: QuestionType) => {
      if (q.category === 'SP') {
        return q
      }
    })
    return listQ
  }
})

const questionIT = computed(() => {
  if (question.getQuestion) {
    const listQ = question.getQuestion.filter((q: QuestionType) => {
      if (q.category === 'IT') {
        return q
      }
    })
    return listQ
  }
})

const questionEC = computed(() => {
  if (question.getQuestion) {
    const listQ = question.getQuestion.filter((q: QuestionType) => {
      if (q.category === 'EC') {
        return q
      }
    })
    return listQ
  }
})

const handleCheckPage = () => {
  menu.setCheckPage(false);
  menu.setShowChangePage(false);
  navigateTo(menu.getKeepPage)
}

const submit = async () => {
  // console.log("scoreTC: ", score.getScoreTC);
  // console.log("scoreSP: ", score.getScoreSP);
  // console.log("scoreIT: ", score.getScoreIT);
  // console.log("scoreEC: ", score.getScoreEC);
  if (score.getCheckScoreTC && score.getCheckScoreSP && score.getCheckScoreIT && score.getCheckScoreEC) {

    isLoading.value = true

    if (score.getScoreTC && score.getScoreSP && score.getScoreIT && score.getScoreEC) {
      answers.value = [...score.getScoreTC, ...score.getScoreSP, ...score.getScoreIT, ...score.getScoreEC]
      await score.sendScore(answers.value)
    }

    isLoading.value = false
    if (score.getPostScore && score.getPostScore.status === 'ok') {
      navigateTo('/Assessment/Summary')
    } else {
      alert("Submit Failed");
    }

  } else {
    alertCheckScore.value = true
  }

};

onMounted(async ()=> {
  isLoading.value = true
  await question.fetchQuestion()
  // await questionTC(question.getQuestion as QuestionType[])
  isLoading.value = false
})
</script>

<style scoped>
.v-stepper-window {
  margin: 0px !important;
}
p {
  font-family: 'Prompt', sans-serif;
}
</style>
