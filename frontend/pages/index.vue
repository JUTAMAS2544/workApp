<template>
  <!-- Page 1 -->
  <div class="tw-p-5 md:tw-p-12 md:tw-h-[540px] tw-bg-black tw-bg-[url('/bg-main.png')] tw-bg-contain md:tw-bg-cover tw-text-white tw-flex tw-justify-end tw-items-center">
    <div class="tw-text-right">
      <p class="tw-pb-2 tw-mb-3 md:tw-pb-5 md:tw-mb-5 md:tw-text-4xl/normal tw-font-bold tw-uppercase tw-tracking-wider tw-border-b-2 md:tw-border-b-4 tw-border-[#FFC700]">
        Index of digital agrifood<br/>technologies on consumer<br/>perceived value and<br/>purchase intention
      </p>
      <p class="tw-mb-3 md:tw-mb-10 tw-text-[8px] md:tw-text-base">
        ดัชนีเทคโนโลยีดิจิทัลด้านเกษตรอาหารที่มีผลต่อคุณค่าที่ผู้บริโภครับรู้และความตั้งใจซื้อ
      </p>
      <NuxtLink to="/Login" class="tw-flex tw-justify-end">
        <v-btn rounded="xl" size="x-small" color="#00ABF5" class="md:tw-hidden tw-block tw-w-20" v-if="!user.getUserData">Login</v-btn>
        <v-btn rounded="xl" size="x-large" color="#00ABF5" class="tw-hidden md:tw-block tw-w-40" v-if="!user.getUserData">Login</v-btn>
      </NuxtLink>
    </div>
    <div>
      <!-- {{ user.getUserData }} -->
    </div>
  </div>

  <!-- Page 2 -->
  <div class="md:tw-px-12 md:tw-py-16 md:tw-h-[600px] tw-bg-[#4D3C00] tw-grid tw-grid-cols-1 md:tw-grid-cols-2 md:tw-gap-16 tw-text-center">
    <v-card class="tw-bg-[#F4FFE7] tw-rounded-none md:tw-rounded-3xl tw-pb-5">
      <v-img height="220px" src="/landing-11.png" cover></v-img>
      <v-card-title class="tw-text-[#0F665C] tw-text-xl md:tw-text-2xl tw-mt-1">
        เทคโนโลยีเกษตรอาหาร
      </v-card-title>
      <v-card-subtitle class="tw-text-[#268D49] tw-opacity-100 tw-text-lg">
        (Agrofood technology)
      </v-card-subtitle>
      <v-card-text class="tw-text-lg">
        เทคโนโลยีสำหรับระบบการเกษตรอาหาร<br/>(Agri-food system) ที่เป็นการนำ<br/>วิทยาศาสตร์และความรู้มาพัฒนาเทคนิคเพื่อ<br/>ส่งมอบผลิตภัณฑ์และ/หรือบริการที่ส่งเสริม<br/>ระบบเกษตรและการจัดการอาหาร
      </v-card-text>
    </v-card>

    <v-card class="tw-bg-[#F4FFE7] tw-rounded-none md:tw-rounded-3xl tw-pb-5">
      <v-img height="220px" src="/landing-12.png" cover></v-img>
      <v-card-title class="tw-text-[#0F665C] tw-text-xl md:tw-text-2xl tw-mt-1">
        เทคโนโลยีดิจิทัลด้านเกษตรอาหาร
      </v-card-title>
      <v-card-subtitle class="tw-text-[#268D49] tw-opacity-100 tw-text-lg">
        (Digital agrifood technology)
      </v-card-subtitle>
      <v-card-text class="tw-text-lg">
        เทคโนโลยีสำหรับระบบการเกษตรอาหารที่เป็น<br/>การนำวิทยาศาสตร์และการประยุกต์เทคโนโลยี<br/>ด้านดิจิทัลเพื่อพัฒนาการส่งมอบผลิตภัณฑ์<br/>และ/หรือบริการให้แก่ผู้บริโภคให้ดีขึ้น
      </v-card-text>
    </v-card>
  </div>

  <!-- Page 3 -->
  <div class="md:tw-py-20 md:tw-h-[580px]">
    <div class="tw-bg-[#384D0B] md:tw-rounded-3xl tw-h-3/4 md:tw-mx-12 tw-py-12">
      <p class="tw-text-3xl md:tw-text-4xl tw-font-bold tw-text-center tw-text-[#EAFFE0] tw-tracking-widest">
        ตัวชี้วัด
      </p>
      <div class=" tw-text-white tw-grid tw-grid-cols-2 md:tw-grid-cols-4 tw-gap-5 md:tw-gap-10 tw-px-5 md:tw-px-10 tw-mt-10 md:tw-mt-12">
        <IndexCard index="01" title="Blockchain food traceability and certification technology" image="/landing-31.png" />
        <IndexCard index="02" title="Smart packaging technology" image="/landing-32.png" />
        <IndexCard index="03" title="IoT sensor in quality and safety control technology" image="/landing-33.png" />
        <IndexCard index="04" title="Agrifood
        E-Commerce technology" image="/landing-34.png" />
      </div>
    </div>

  </div>

  <!-- Page 4 -->
  <div class="tw-py-10 tw-px-5 md:tw-py-16 md:tw-px-12">
    <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-8 md:tw-gap-14 tw-items-center">
      <div>
        <p class="tw-text-2xl md:tw-text-3xl tw-font-semibold tw-text-[#0F665C] tw-mb-1">
          เทคโนโลยีบล็อกเชนที่ใช้ในการตรวจสอบย้อนกลับ และการรับรองมาตรฐาน
        </p>
        <p class="tw-capitalize tw-tracking-wider tw-text-base md:tw-text-lg tw-font-medium tw-text-[#268D49]">
          (Blockchain food traceability and certification technology)
        </p>
        <p class="tw-text-lg md:tw-text-xl tw-text-black tw-mt-4">
          เทคโนโลยีที่เป็นระบบในการติดตามที่มาของผลไม้สดในการไปใช้เพื่อการบริโภค ตลอดทุกขั้นตอนของการผลิต การแปรรูป และการจัดจำหน่ายที่ผ่านการรับรองตามมาตรฐานสากลทางอาหาร
        </p>
      </div>
      <img src="/landing-4.png" class="tw-rounded-3xl tw-order-first md:tw-order-last">
    </div>
  </div>

  <!-- Page 5 -->
  <div class="tw-py-10 tw-px-5 md:tw-py-16 md:tw-px-12 tw-bg-[#006B18]">
    <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-8 md:tw-gap-14 tw-items-center">
      <img src="/landing-5.png" class="tw-rounded-3xl">
      <div class="md:tw-text-right">
        <p class="tw-text-2xl md:tw-text-3xl tw-font-semibold tw-text-[#C2E829] tw-mb-1">
          เทคโนโลยีบรรจุภัณฑ์สมาร์ท
        </p>
        <p class="tw-capitalize tw-tracking-wider tw-text-base md:tw-text-lg tw-font-medium tw-text-[#ABB77B]">
          (Smart packaging technology)
        </p>
        <p class="tw-text-lg md:tw-text-xl tw-text-white tw-mt-4">
          เทคโนโลยีในอุตสาหกรรมบรรจุภัณฑ์อาหารที่ช่วยให้รักษาคุณภาพของผลไม้ให้สดใหม่ยาวนานขึ้น
และมีข้อมูลที่สำคัญแก่ผู้บริโภค เช่น ตัวบ่งชี้ ความสดใหม่และความสุกงอมของผลไม้ เป็นต้น
        </p>
      </div>
    </div>
  </div>

  <!-- Page 6 -->
  <div class="tw-py-10 tw-px-5 md:tw-py-16 md:tw-px-12">
    <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-8 md:tw-gap-14 tw-items-center">
      <div>
        <p class="tw-text-2xl md:tw-text-3xl tw-font-semibold tw-text-[#0F665C] tw-mb-1">
          เทคโนโลยีไอโอทีเซ็นเซอร์ในการควบคุมคุณภาพและความปลอดภัย
        </p>
        <p class="tw-capitalize tw-tracking-wider tw-text-base md:tw-text-lg tw-font-medium tw-text-[#268D49]">
          (IoT sensor in quality and safety control technology)
        </p>
        <p class="tw-text-lg md:tw-text-xl tw-text-black tw-mt-4">
          เทคโนโลยีด้านเซนเซอร์ที่ใช้ควบคุมคุณภาพและความปลอดภัยของผลไม้สดในแต่ละห่วงโซ่อุปทาน ตั้งแต่แหล่งผลิตจนถึงจุดขายผ่านเครือข่ายอินเตอร์เน็ต
        </p>
      </div>
      <img src="/landing-6.png" class="tw-rounded-3xl tw-order-first md:tw-order-last">
    </div>
  </div>

  <!-- Page 7 -->
  <div class="tw-py-10 tw-px-5 md:tw-py-16 md:tw-px-12 tw-bg-[#507F13]">
    <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-8 md:tw-gap-14 tw-items-center">
      <img src="/landing-7.png" class="tw-rounded-3xl">
      <div class="md:tw-text-right">
        <p class="tw-text-2xl md:tw-text-3xl tw-font-semibold tw-text-[#C2E829] tw-mb-1">
          เทคโนโลยีการซื้อขายผลไม้ผ่านระบบพาณิชย์อิเล็กทรอนิกส์
        </p>
        <p class="tw-capitalize tw-tracking-wider tw-text-base md:tw-text-lg tw-font-medium tw-text-[#ABB77B]">
          (Agrifood E-Commerce technology)
        </p>
        <p class="tw-text-lg md:tw-text-xl tw-text-white tw-mt-4">
          เทคโนโลยีอีคอมเมิร์สที่ผู้บริโภคสามารถสั่งซื้อ
ผลไม้สดผ่านแพลตฟอร์มออนไลน์ที่ให้ความ
สะดวกและให้ข้อมูลต่างๆ ที่สำคัญของสินค้า ที่มีมาตรฐานพร้อมส่งตรงถึงที่หมายโดยตรง
        </p>
      </div>
    </div>
  </div>

  <!-- Page 8 -->
  <div class="tw-py-10 tw-px-5 md:tw-py-16 md:tw-px-12">
    <p class="tw-text-3xl md:tw-text-4xl tw-font-bold tw-text-center tw-text-[#0F665C] tw-tracking-widest tw-uppercase">
      customer testimonial
    </p>
    <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6 md:tw-gap-10 tw-mt-10 tw-h-[590px] md:tw-h-96">
      <Testimonial
        text="หลังการประเมิน DigiFruit Index
            และการได้รับคำแนะนำจากที่ปรึกษามืออาชีพ
            สินค้าของเราขายได้มากขึ้นด้วยราคาที่สูงขึ้น
            ดีใจมากค่ะ"
        image="/testimonial-1.png"
      />
      <Testimonial
        text="พอรู้ว่าเราจะเอาเทคโนโลยีมาใช้อย่างไร ผ่านการแนะนำจากทีมงานทำให้เราตีตลาดกลุ่มเฉพาะได้มากขึ้น เพราะลูกค้าให้ความสำคัญกับสิ่งนี้ และพร้อมจะจ่ายเงินเพิ่มกับผลไม้ของเรา"
        image="/testimonial-2.png"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const user = useUser();


</script>

<style scoped>

</style>