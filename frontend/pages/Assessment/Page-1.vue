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
          <p class="tw-text-lg tw-font-semibold">ท่านยังเลือกคะแนนไม่ครบ</p>
          <p>กรุณาตรวจสอบ
            <span v-if="!score.getCheckScoreTC" class="tw-font-semibold">คำถามที่ 1 </span>
            <span v-if="!score.getCheckScoreSP" class="tw-font-semibold">คำถามที่ 2 </span>
            <span v-if="!score.getCheckScoreIT" class="tw-font-semibold">คำถามที่ 3 </span>
            <span v-if="!score.getCheckScoreEC" class="tw-font-semibold">คำถามที่ 4 </span>
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
                <QuestionTable v-if="n===1 && tc" text="tc" :detail="tc" />
                <QuestionTable v-if="n===2 && sp" text="sp" :detail="sp" />
                <QuestionTable v-if="n===3 && it" text="it" :detail="it" />
                <QuestionTable v-if="n===4 && ec" text="ec" :detail="ec" />
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
import type { ScoreSendType } from '~/types/score';

definePageMeta({
  middleware: ['auth']
})

const question = useQuestion()
const score = useScore()
const menu = useActive();
const user = useUser();

const tc = computed(() => question.getQuestionTC)
const sp = computed(() => question.getQuestionSP)
const it = computed(() => question.getQuestionIT)
const ec = computed(() => question.getQuestionEC)
const show = computed(() => menu.getShowChangePage)

const isLoading = ref(false)
const alertCheckScore = ref(false)
const answers = ref<ScoreSendType>()

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

const handleCheckPage = () => {
  menu.setCheckPage(false);
  menu.setShowChangePage(false);
  navigateTo(menu.getKeepPage)
}

const submit = async () => {
  if (score.getCheckScoreTC && score.getCheckScoreSP && score.getCheckScoreIT && score.getCheckScoreEC) {
    isLoading.value = true
    answers.value = {
      userId: score.getUserID,
      ans1_tc: score.getScoreTC?.question_1 as number,
      ans2_tc: score.getScoreTC?.question_2 as number,
      ans3_tc: score.getScoreTC?.question_3 as number,
      ans4_tc: score.getScoreTC?.question_4 as number,
      ans5_tc: score.getScoreTC?.question_5 as number,
      ans6_tc: score.getScoreTC?.question_6 as number,
      ans7_tc: score.getScoreTC?.question_7 as number,
      ans8_tc: score.getScoreTC?.question_8 as number,
      ans9_tc: score.getScoreTC?.question_9 as number,
      ans10_sp: score.getScoreSP?.question_1 as number,
      ans11_sp: score.getScoreSP?.question_2 as number,
      ans12_sp: score.getScoreSP?.question_3 as number,
      ans13_it: score.getScoreIT?.question_1 as number,
      ans14_it: score.getScoreIT?.question_2 as number,
      ans15_it: score.getScoreIT?.question_3 as number,
      ans16_it: score.getScoreIT?.question_4 as number,
      ans17_it: score.getScoreIT?.question_5 as number,
      ans18_it: score.getScoreIT?.question_6 as number,
      ans19_it: score.getScoreIT?.question_7 as number,
      ans20_ec: score.getScoreEC?.question_1 as number,
      ans21_ec: score.getScoreEC?.question_2 as number,
      ans22_ec: score.getScoreEC?.question_3 as number,
      ans23_ec: score.getScoreEC?.question_4 as number,
      ans24_ec: score.getScoreEC?.question_5 as number,
      ans25_ec: score.getScoreEC?.question_6 as number,
      ans26_ec: score.getScoreEC?.question_7 as number,
      ans27_ec: score.getScoreEC?.question_8 as number,
      ans28_ec: score.getScoreEC?.question_9 as number,
      ans29_ec: score.getScoreEC?.question_10 as number,
      ans30_ec: score.getScoreEC?.question_11 as number
    }
    await score.sendScore(answers.value)
    isLoading.value = false
    if (score.getPostScore && score.getPostScore.status === 'ok') {
      navigateTo('/Assessment/Summary')
    } else {
      console.log("submit Failed T0T");
    }
    // console.log("submit");
  } else {
    alertCheckScore.value = true
  }

};

onMounted(async ()=> {
  isLoading.value = true
  await question.fetchQuestionTC()
  await question.fetchQuestionSP()
  await question.fetchQuestionIT()
  await question.fetchQuestionEC()
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
