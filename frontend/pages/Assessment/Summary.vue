<template>
  <Loading :loading="isLoading" />
  <div class="tw-mt-10 tw-mx-5 md:tw-mx-14">
    <div class="tw-grid tw-grid-cols-4 md:tw-grid-cols-5 tw-w-full">
      <div
        class="tw-col-span-3 md:tw-col-span-4 tw-bg-[#F1F1F1] tw-p-3 md:tw-p-6"
      >
        <p class="tw-text-xs md:tw-text-2xl tw-font-semibold">
          ดัชนีเทคโนโลยีดิจิทัลด้านเกษตรอาหารที่มีผลต่อคุณค่าที่ผู้บริโภครับรู้และความตั้งใจซื้อ
        </p>
        <p
          class="tw-text-[#0F665C] tw-text-[10px] md:tw-text-xl tw-font-semibold tw-mt-2"
        >
          Index of Digital Agrifood Technologies Influencing on Consumer Perceived Value and Purchase Intention
        </p>
      </div>
      <div
        class="md:tw-text-3xl tw-font-bold tw-flex tw-items-center tw-justify-center tw-text-white tw-bg-[#A30000]"
      >
        <p>{{ scoreMain.toFixed(2) }}%</p>
      </div>
    </div>
    <div class="tw-py-3 tw-mx-auto md:tw-w-3/5 md:tw-py-8">
      <BarChart :tc="scoreTC" :sp="scoreSP" :it="scoreIT" :ec="scoreEC" />
    </div>
    <div class="tw-text-[10px] md:tw-text-base tw-text-lime-900 tw-flex tw-justify-center">
      <div>
        <p><b>ระดับการประยุกต์ใช้ TC :</b> Traceability and Certification</p>
        <p><b>ระดับการประยุกต์ใช้ SP :</b> Smart Packaging Technology</p>
        <p><b>ระดับการประยุกต์ใช้ IT :</b> IoT Sensor in Quality and Aafety Control</p>
        <p><b>ระดับการประยุกต์ใช้ EC :</b> Agrifood E-Commerce Technology</p>
      </div>
    </div>
  </div>

  <div class="tw-bg-[#FBFFE0] tw-mt-10 tw-py-10 tw-px-5 md:tw-px-20">
    <p
      class="tw-mb-6 tw-text-base md:tw-text-2xl tw-font-semibold tw-text-center"
    >
      ตารางแสดงผลลัพธ์การประเมิน
    </p>

    <template v-for="i in data" :key="i.id">
      <div
        class="tw-grid tw-grid-cols-4 md:tw-grid-cols-5 tw-w-full tw-border-b-2"
        :class="
          i.id === 1 || i.id === 5 || i.id === 7 || i.id === 10
            ? 'tw-bg-[#FFC700]'
            : 'tw-bg-white'
        "
      >
        <div
          class="tw-col-span-3 md:tw-col-span-4 tw-p-3 md:tw-px-6 md:tw-py-3"
        >
          <p class="tw-text-xs md:tw-text-lg tw-font-semibold">
            {{ i.nameTH }}
          </p>
          <p class="tw-text-[10px] md:tw-text-base tw-font-semibold tw-mt-2">
            {{ i.nameEN }}
          </p>
        </div>
        <div
          class="tw-text-sm md:tw-text-2xl tw-font-semibold tw-flex tw-items-center tw-justify-end tw-p-3 md:tw-p-6"
        >
          <p>{{ i.value.toFixed(2) }}%</p>
        </div>
      </div>
    </template>
    <div class="tw-text-center tw-mt-10">
      <v-btn rounded="xl" size="large" color="#00ABF5" class="tw-text-white" @click="goToSuggession">Suggession</v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import Chart from 'chart.js/auto';
import type { ScoreDataType, SummaryType } from "~/types/score";

definePageMeta({
  middleware: ["auth"],
});

const myChart = ref<Chart>();

const score = useScore();
const isLoading = ref(false);
const data = ref<ScoreDataType[]>();
const scoreMain = computed(() => {
  if (score.getSummary) return score.getSummary.score;
  return 0;
});
const scoreTC = ref(0)
const scoreSP = ref(0)
const scoreIT = ref(0)
const scoreEC = ref(0)

const goToSuggession = () => {
  navigateTo('/Assessment/Suggession')
}

watchEffect(async () => {
  if (!score.getSummary) {
    data.value = [
      {
        id: 1,
        nameTH: "ระดับการประยุกต์ใช้เทคโนโลยีการตรวจสอบย้อนกลับและการรับรองมาตรฐาน",
        nameEN: "Traceability and Certification Adoption",
        value: 0,
      },
      {
        id: 2,
        nameTH: "การรับรู้ถึงความเชื่อมั่นในระบบ",
        nameEN: "Perceived System Trust",
        value: 0,
      },
      {
        id: 3,
        nameTH: "การรับรู้ถึงความน่าเชื่อถือในระบบ",
        nameEN: "Perceived System Reliability",
        value: 0,
      },
      {
        id: 4,
        nameTH: "คุณภาพของข้อมูลผลิตภัณฑ์",
        nameEN: "Product Information Quality",
        value: 0,
      },
      {
        id: 5,
        nameTH: "ระดับการประยุกต์ใช้เทคโนโลยีบรรจุภัณฑ์สมาร์ท",
        nameEN: "Smart Packaging Technology Adoption",
        value: 0,
      },
      {
        id: 6,
        nameTH: "ฟังก์ชันของบรรจุภัณฑ์",
        nameEN: "Packaging Functions",
        value: 0,
      },
      {
        id: 7,
        nameTH:
          "ระดับการประยุกต์ใช้เทคโนโลยีไอโอทีเซ็นเซอร์ในการควบคุมคุณภาพและความปลอดภัย",
        nameEN: "IoT Sensor in Quality and Aafety Control Adoption",
        value: 0,
      },
      {
        id: 8,
        nameTH: "คุณลักษณะด้านคุณภาพของผลิตภัณฑ์",
        nameEN: "Product Quality Attribute",
        value: 0,
      },
      {
        id: 9,
        nameTH: "คุณลักษณะด้านความปลอดภัยของผลิตภัณฑ์",
        nameEN: "Product Safety Attribute",
        value: 0,
      },
      {
        id: 10,
        nameTH:
          "ระดับการประยุกต์ใช้เทคโนโลยีการซื้อขายผลไม้ผ่านระบบพาณิชย์อิเล็กทรอนิกส์",
        nameEN: "Agrifood E-Commerce Technology Adoption",
        value: 0,
      },
      {
        id: 11,
        nameTH: "คุณภาพของระบบ",
        nameEN: "System Quality",
        value: 0,
      },
      {
        id: 12,
        nameTH: "คุณภาพของข้อมูล",
        nameEN: "Information Quality",
        value: 0,
      },
      {
        id: 13,
        nameTH: "คุณภาพของการบริการอิเล็กทรอนิกส์",
        nameEN: "E-service Quality",
        value: 0,
      },
    ];
    isLoading.value = true;
  } else {
    scoreTC.value = score.getSummary.tc_4;
    scoreSP.value = score.getSummary.sp_1;
    scoreIT.value = score.getSummary.it_3;
    scoreEC.value = score.getSummary.ec_4;
    data.value = [
      {
        id: 1,
        nameTH: "ระดับการประยุกต์ใช้เทคโนโลยีการตรวจสอบย้อนกลับและการรับรองมาตรฐาน",
        nameEN: "Traceability and Certification Adoption",
        value: score.getSummary.tc_4,
      },
      {
        id: 2,
        nameTH: "การรับรู้ถึงความเชื่อมั่นในระบบ",
        nameEN: "Perceived System Trust",
        value: score.getSummary.tc_1,
      },
      {
        id: 3,
        nameTH: "การรับรู้ถึงความน่าเชื่อถือในระบบ",
        nameEN: "Perceived System Reliability",
        value: score.getSummary.tc_2,
      },
      {
        id: 4,
        nameTH: "คุณภาพของข้อมูลผลิตภัณฑ์",
        nameEN: "Product Information Quality",
        value: score.getSummary.tc_3,
      },
      {
        id: 5,
        nameTH: "ระดับการประยุกต์ใช้เทคโนโลยีบรรจุภัณฑ์สมาร์ท",
        nameEN: "Smart Packaging Technology Adoption",
        value: score.getSummary.sp_1,
      },
      {
        id: 6,
        nameTH: "ฟังก์ชันของบรรจุภัณฑ์",
        nameEN: "Packaging Functions",
        value: score.getSummary.sp_1,
      },
      {
        id: 7,
        nameTH:
          "ระดับการประยุกต์ใช้เทคโนโลยีไอโอทีเซ็นเซอร์ในการควบคุมคุณภาพและความปลอดภัย",
        nameEN: "IoT Sensor in Quality and Aafety Control Adoption",
        value: score.getSummary.it_3,
      },
      {
        id: 8,
        nameTH: "คุณลักษณะด้านคุณภาพของผลิตภัณฑ์",
        nameEN: "Product Quality Attribute",
        value: score.getSummary.it_1,
      },
      {
        id: 9,
        nameTH: "คุณลักษณะด้านความปลอดภัยของผลิตภัณฑ์",
        nameEN: "Product Safety Attribute",
        value: score.getSummary.it_2,
      },
      {
        id: 10,
        nameTH:
          "ระดับการประยุกต์ใช้เทคโนโลยีการซื้อขายผลไม้ผ่านระบบพาณิชย์อิเล็กทรอนิกส์",
        nameEN: "Agrifood E-Commerce Technology Adoption",
        value: score.getSummary.ec_4,
      },
      {
        id: 11,
        nameTH: "คุณภาพของระบบ",
        nameEN: "System Quality",
        value: score.getSummary.ec_1,
      },
      {
        id: 12,
        nameTH: "คุณภาพของข้อมูล",
        nameEN: "Information Quality",
        value: score.getSummary.ec_2,
      },
      {
        id: 13,
        nameTH: "คุณภาพของการบริการอิเล็กทรอนิกส์",
        nameEN: "E-service Quality",
        value: score.getSummary.ec_3,
      },
    ];
    isLoading.value = false;
  }
});

onMounted(async () => {
  isLoading.value = true;
  await score.fetchSummary();
  if (score.getSummary) {
    scoreTC.value = score.getSummary.tc_4;
    scoreSP.value = score.getSummary.sp_1;
    scoreIT.value = score.getSummary.it_3;
    scoreEC.value = score.getSummary.ec_4;
  }
  isLoading.value = false;
});
</script>

<style scoped></style>
