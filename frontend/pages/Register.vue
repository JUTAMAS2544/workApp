<template>
  <div class="tw-bg-[url('/bg-login.png')] tw-bg-cover tw-bg-center tw-h-full">
    <v-container class="tw-flex tw-justify-center tw-items-center tw-h-full">
      <v-card class="tw-py-3 md:tw-py-6 md:tw-px-6 tw-rounded-3xl tw-w-4/5">
        <v-card-item>
          <v-card-title
            class="tw-text-center tw-text-xl md:tw-text-2xl tw-font-semibold"
          >
            Create an account
          </v-card-title>
        </v-card-item>
        <v-card-text class="tw-mt-3">
          <form @submit.prevent="onSubmit">
            <!-- ข้อมูลทั่วไป -->
            <div v-if="!next">
              <div
                class="tw-text-black tw-overflow-y-scroll tw-px-5 tw-h-[320px]"
              >
                <p class="tw-text-lg tw-font-semibold tw-mb-2">ข้อมูลทั่วไป</p>
                <v-divider :thickness="2" class="tw-opacity-100"></v-divider>

                <div
                  class="tw-grid tw-grid-cols-3 tw-gap-x-5 tw-justify-center tw-mt-10"
                >
                  <v-select
                    v-model="sex.value.value"
                    label="เพศ"
                    density="comfortable"
                    variant="outlined"
                    :items="data[0]"
                    :error-messages="sex.errorMessage.value"
                  ></v-select>
                  <v-select
                    v-model="age.value.value"
                    label="อายุ"
                    density="comfortable"
                    variant="outlined"
                    :items="data[1]"
                    :error-messages="age.errorMessage.value"
                  ></v-select>
                  <v-select
                    v-model="status.value.value"
                    label="สถานภาพ"
                    density="comfortable"
                    variant="outlined"
                    :items="data[2]"
                    :error-messages="status.errorMessage.value"
                  ></v-select>
                </div>
                <div
                  class="tw-grid tw-grid-cols-2 tw-gap-x-5 tw-justify-center tw-mt-2"
                >
                  <v-select
                    v-model="education_level.value.value"
                    label="ระดับการศึกษา"
                    density="comfortable"
                    variant="outlined"
                    :items="data[3]"
                    :error-messages="education_level.errorMessage.value"
                  ></v-select>
                  <v-select
                    v-model="occupation.value.value"
                    label="อาชีพ"
                    density="comfortable"
                    variant="outlined"
                    :items="data[4]"
                    :error-messages="occupation.errorMessage.value"
                  ></v-select>
                </div>
                <v-select
                  class="tw-mt-2"
                  v-model="working_period_agrofood.value.value"
                  label="ระยะเวลาที่ทำงาน (ปี) ในภาคผู้ประกอบการขนาดกลางและขนาดย่อม (SME) ด้านเกษตรอาหาร"
                  density="comfortable"
                  variant="outlined"
                  :items="data[5]"
                  :error-messages="working_period_agrofood.errorMessage.value"
                ></v-select>
                <v-select
                  class="tw-mt-2"
                  v-model="type_sme.value.value"
                  label="ประเภทของ SMEs ใด ที่ท่านเคยมีประสบการณ์"
                  density="comfortable"
                  variant="outlined"
                  :items="data[6]"
                  :error-messages="type_sme.errorMessage.value"
                ></v-select>
                <v-select
                  class="tw-mt-2"
                  v-model="working_period.value.value"
                  label="ระยะเวลาที่ทำงาน (ปี) ในภาคผู้ประกอบการขนาดกลางและขนาดย่อม (SME)"
                  density="comfortable"
                  variant="outlined"
                  :items="data[7]"
                  :error-messages="working_period.errorMessage.value"
                ></v-select>
                <v-select
                  class="tw-mt-2"
                  v-model="num_personnel.value.value"
                  label="จำนวนบุคลากรภายในองค์กรของท่าน"
                  density="comfortable"
                  variant="outlined"
                  :items="data[8]"
                  :error-messages="num_personnel.errorMessage.value"
                ></v-select>
                <v-text-field
                  class="tw-mt-2"
                  v-model="email.value.value"
                  type="email"
                  density="comfortable"
                  variant="outlined"
                  label="E-mail"
                  :error-messages="email.errorMessage.value"
                />
                <v-text-field
                  class="tw-mt-2"
                  v-model="password.value.value"
                  :type="!showPassword ? 'password' : 'text'"
                  density="comfortable"
                  variant="outlined"
                  label="Password"
                  :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append-inner="showPassword = !showPassword"
                  :error-messages="password.errorMessage.value"
                />
                <v-text-field
                  class="tw-my-2"
                  v-model="confirmPassword.value.value"
                  :type="!showConfirmPassword ? 'password' : 'text'"
                  density="comfortable"
                  variant="outlined"
                  label="Confirm Password"
                  :append-inner-icon="
                    showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'
                  "
                  @click:append-inner="
                    showConfirmPassword = !showConfirmPassword
                  "
                  :error-messages="confirmPassword.errorMessage.value"
                />
              </div>
              <div class="tw-flex tw-gap-x-4 tw-justify-center tw-px-5">
                <v-btn
                  rounded="xl"
                  color="#00ABF5"
                  size="large"
                  class="tw-mt-5 tw-w-full"
                  @click="onNext"
                >
                  Next
                </v-btn>
              </div>
            </div>

            <!-- คำถาม -->
            <div v-else>
              <div class="tw-text-black tw-overflow-y-scroll tw-px-5 tw-h-[320px]">
                <p class="tw-text-lg tw-font-semibold tw-mb-2">
                  คำถามเกี่ยวกับพฤติกรรมเกี่ยวกับผู้ประกอบการเกษตรอาหาร
                </p>
                <v-divider :thickness="2" class="tw-opacity-100"></v-divider>

                <p class="tw-mt-10 tw-mb-3 tw-text-base">
                  1. ชนิดผลไม้สดใดที่เกี่ยวข้องกับธุรกิจหรืองานของท่าน
                  (กรุณาเลือก 3 ข้อ)
                </p>
                <v-select
                  class="tw-mt-2"
                  v-model="answer_1.value.value"
                  label="กรุณาเลือกคำตอบ"
                  density="comfortable"
                  variant="outlined"
                  multiple
                  :items="data[9]"
                  :error-messages="answer_1.errorMessage.value"
                >
                {{ answer_1.value.value }}
                </v-select>
                <p class="tw-mt-2 tw-mb-3 tw-text-base">
                  2. ช่องทางในจำหน่ายการซื้อสินค้าผลไม้สดเพื่อการบริโภค
                  (ตอบได้มากกว่า 1 ข้อ)
                </p>
                <v-select
                  class="tw-mt-2"
                  v-model="answer_2.value.value"
                  label="กรุณาเลือกคำตอบ"
                  density="comfortable"
                  variant="outlined"
                  multiple
                  :items="data[10]"
                  :error-messages="answer_2.errorMessage.value"
                ></v-select>
                <p class="tw-mt-2 tw-mb-3 tw-text-base">
                  3. ท่านคิดว่าข้อใดคือ
                  เทคโนโลยีที่เป็นระบบในการติดตามที่มาของผลไม้สดในการไปใช้เพื่อการบริโภค
                  ตลอดทุกขั้นตอนของการผลิต การแปรรูป
                  และการจัดจำหน่ายที่ผ่านการรับรองตามมาตรฐานสากลทางอาหาร เช่น
                  ระบบสแกน QR code ชี้แจงที่มาของผลไม้สด
                </p>
                <v-select
                  class="tw-mt-2"
                  v-model="answer_3.value.value"
                  label="กรุณาเลือกคำตอบ"
                  density="comfortable"
                  variant="outlined"
                  :items="data[11]"
                  :error-messages="answer_3.errorMessage.value"
                ></v-select>
                <p class="tw-mt-2 tw-mb-3 tw-text-base">
                  4. ท่านคิดว่าข้อใดคือ
                  เทคโนโลยีในอุตสาหกรรมบรรจุภัณฑ์อาหารที่ช่วยให้รักษาคุณภาพของผลไม้ให้สดใหม่ยาวนานขึ้นและมีข้อมูลที่สำคัญแก่ผู้บริโภค
                  เช่น ตัวบ่งชี้ความสดใหม่และความสุกงอมของผลไม้ เป็นต้น
                </p>
                <v-select
                  class="tw-mt-2"
                  v-model="answer_4.value.value"
                  label="กรุณาเลือกคำตอบ"
                  density="comfortable"
                  variant="outlined"
                  :items="data[12]"
                  :error-messages="answer_4.errorMessage.value"
                ></v-select>
                <p class="tw-mt-2 tw-mb-3 tw-text-base">
                  5. ท่านคิดว่าข้อใดคือ
                  เทคโนโลยีด้านเซนเซอร์ที่ใช้ควบคุมคุณภาพและความปลอดภัยของผลไม้สดในแต่ละห่วงโซ่อุปทานตั้งแต่แหล่งผลิตจนถึงจุดขายผ่านเครือข่ายอินเตอร์เนท
                </p>
                <v-select
                  class="tw-mt-2"
                  v-model="answer_5.value.value"
                  label="กรุณาเลือกคำตอบ"
                  density="comfortable"
                  variant="outlined"
                  :items="data[13]"
                  :error-messages="answer_5.errorMessage.value"
                ></v-select>
                <p class="tw-mt-2 tw-mb-3 tw-text-base">
                  6. ท่านคิดว่าข้อใดคือ เทคโนโลยีอีคอมเมิร์สที่ผู้บริโภคสามารถสั่งซื้อผลไม้สดผ่านแพลตฟอร์มออนไลน์ที่ให้ความสะดวกและให้ข้อมูลต่างๆที่สำคัญของสินค้าที่มีมาตรฐานพร้อมส่งตรงถึงที่หมายโดยตรง
                </p>
                <v-select
                  class="tw-mt-2"
                  v-model="answer_6.value.value"
                  label="กรุณาเลือกคำตอบ"
                  density="comfortable"
                  variant="outlined"
                  :items="data[14]"
                  :error-messages="answer_6.errorMessage.value"
                ></v-select>
              </div>
              <div class="tw-grid tw-grid-cols-2 tw-gap-x-4 tw-justify-center tw-px-5">
                <v-btn
                  rounded="xl"
                  color="#006A24"
                  size="large"
                  class="tw-mt-5 tw-w-full"
                  @click="onBack"
                >
                  Back
                </v-btn>
                <v-btn
                  rounded="xl"
                  color="#FFC700"
                  size="large"
                  class="tw-mt-5 tw-w-full tw-text-white"
                  type="submit"
                >
                  Create Account
                </v-btn>
              </div>
            </div>
            <p class="tw-text-center tw-mt-5 tw-text-gray-400">
              Already have an account ?
              <span class="tw-text-blue-600 hover:tw-text-blue-400 tw-cursor-pointer" @click="goToLogin">Login</span>
            </p>
          </form>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { useValidate } from '~/stores/validate';

const validate = useValidate();
const user = useUser();

const showPassword = ref(false);
const showConfirmPassword = ref(false);
const checkPassword = ref('');
const next = ref(false);
const data = {
  0: ["ชาย", "หญิง"],
  1: [
    "20-24 ปี",
    "25-29 ปี",
    "30-34 ปี",
    "35-39 ปี",
    "40-44 ปี",
    "45-49 ปี",
    "50-59 ปี",
    "60 ปีขึ้นไป",
  ],
  2: ["โสด", "สมรส", "อื่น ๆ (โปรดระบุ).........................."],
  3: ["ต่ำกว่าปริญญาตรี", "ปริญญาตรี", "ปริญญาโทหรือสูงกว่า"],
  4: [
    "ผู้ประกอบการ",
    "ข้าราชการ/พนักงานรัฐวิสาหกิจ",
    "พนักงานบริษัทเอกชน",
    "อาชีพอิสระ",
    "อื่น ๆ (โปรดระบุ).........................",
  ],
  5: ["1-3 ปี", "3-5 ปี", "5-7 ปี", "8-10 ปี", "มากกว่า 10 ปีขึ้นไป"],
  6: [
    "ภาคเกษตรกรรม",
    "ภาคอุตสาหกรรมเกษตรแปรรูป",
    "ภาคการค้าปลีก/ส่งสินค้าเกษตร",
    "ภาคการค้าปลีก/ส่งสินค้าเกษตรแปรรูป",
    "ภาคขนส่งสินค้าเกษตร",
    "ภาคขนส่งสินค้าเกษตรแปรรูป",
    "อื่น ๆ (โปรดระบุ)............................",
  ],
  7: ["1-3 ปี", "3-5 ปี", "5-7 ปี", "8-10 ปี", "มากกว่า 10 ปีขึ้นไป"],
  8: [
    "1-20 คน",
    "30-50 คน",
    "50-70 คน",
    "70-100 คน",
    "100-150 คน",
    "150-200 คน",
    "200 คนขึ้นไป",
  ],
  9: [
    "ส้ม",
    "กล้วย",
    "มะละกอ",
    "มะม่วง",
    "แตงโม",
    "แอปเปิ้ล",
    "ฝรั่ง",
    "สับปะรด",
    "เงาะ",
    "ชมพู่",
    "มะพร้าว",
    "ลำไย",
    "ลิ้นจี่",
    "เสาวรส",
    "มังคุด",
    "ส้มโอ",
    "ทุเรียน",
    "ลองกอง",
    "ขนุน",
    "ผลไม้กลุ่มเบอรี่",
    "อื่น ๆ (โปรดระบุ).........................",
  ],
  10: [
    "ห้างค้าปลีก/ส่ง",
    "ตลาดสด",
    "ร้านค้าทั่วไป",
    "ขายจากแปลงปลูกโดยตรง",
    "ร้านค้าออนไลน์",
    "อื่น ๆ (โปรดระบุ)............................",
  ],
  11: [
    "เทคโนโลยีการตรวจสอบย้อนกลับและการรับรองมาตรฐาน",
    "เทคโนโลยีบรรจุภัณฑ์สมาร์ท",
    "เทคโนโลยีไอโอทีเซ็นเซอร์ในการควบคุมคุณภาพและความปลอดภัย",
    "เทคโนโลยีการซื้อขายผลไม้ผ่านระบบพาณิชย์อิเล็กทรอนิกส์",
  ],
  12: [
    "เทคโนโลยีการตรวจสอบย้อนกลับและการรับรองมาตรฐาน",
    "เทคโนโลยีบรรจุภัณฑ์สมาร์ท",
    "เทคโนโลยีไอโอทีเซ็นเซอร์ในการควบคุมคุณภาพและความปลอดภัย",
    "เทคโนโลยีการซื้อขายผลไม้ผ่านระบบพาณิชย์อิเล็กทรอนิกส์",
  ],
  13: [
    "เทคโนโลยีการตรวจสอบย้อนกลับและการรับรองมาตรฐาน",
    "เทคโนโลยีบรรจุภัณฑ์สมาร์ท",
    "เทคโนโลยีไอโอทีเซ็นเซอร์ในการควบคุมคุณภาพและความปลอดภัย",
    "เทคโนโลยีการซื้อขายผลไม้ผ่านระบบพาณิชย์อิเล็กทรอนิกส์",
  ],
  14: [
    "เทคโนโลยีการตรวจสอบย้อนกลับและการรับรองมาตรฐาน",
    "เทคโนโลยีบรรจุภัณฑ์สมาร์ท",
    "เทคโนโลยีไอโอทีเซ็นเซอร์ในการควบคุมคุณภาพและความปลอดภัย",
    "เทคโนโลยีการซื้อขายผลไม้ผ่านระบบพาณิชย์อิเล็กทรอนิกส์",
  ],
};

// form validation
const { handleSubmit } = useForm({
  validationSchema: {
    email (value: string) {
      if (!next.value && validate.isRequired(value)) return validate.isRequired(value)
      if (!next.value && validate.isEmail(value)) return validate.isEmail(value)

      return true
    },
    password (value: string) {
      if (!next.value && validate.isRequired(value)) return validate.isRequired(value)
      if (!next.value && validate.isPassword(value)) return validate.isPassword(value)
      return true
    },
    confirmPassword (value: string) {
      if (!next.value && validate.isRequired(value) &&!next.value) return validate.isRequired(value)
      if (value !== checkPassword.value &&!next.value) return 'รหัสผ่านไม่ถูกต้อง'
      return true
    },
    sex (value: string) {
      if (!next.value && validate.isRequired(value)) return validate.isRequired(value)
      return true
    },
    age (value: string) {
      if (!next.value && validate.isRequired(value)) return validate.isRequired(value)
      return true
    },
    status (value: string) {
      if (!next.value && validate.isRequired(value)) return validate.isRequired(value)
      return true
    },
    education_level (value: string) {
      if (!next.value && validate.isRequired(value)) return validate.isRequired(value)
      return true
    },
    occupation (value: string) {
      if (!next.value && validate.isRequired(value)) return validate.isRequired(value)
      return true
    },
    working_period_agrofood (value: string) {
      if (!next.value && validate.isRequired(value)) return validate.isRequired(value)
      return true
    },
    type_sme (value: string) {
      if (!next.value && validate.isRequired(value)) return validate.isRequired(value)
      return true
    },
    working_period (value: string) {
      if (!next.value && validate.isRequired(value)) return validate.isRequired(value)
      return true
    },
    num_personnel (value: string) {
      if (!next.value && validate.isRequired(value)) return validate.isRequired(value)
      return true
    },
    answer_1 (value: string[]) {
      if (next.value && !value) return 'ต้องกรอก'
      if (next.value && value.length < 3) return 'คำตอบของคุณ น้อยกว่า 3 ข้อ'
      if (next.value && value.length > 3) return 'คำตอบของคุณ มากกว่า 3 ข้อ'
      return true
    },
    answer_2 (value: string[]) {
      if (next.value && !value) return 'ต้องกรอก'
      return true
    },
    answer_3 (value: string) {
      if (next.value && validate.isRequired(value)) return validate.isRequired(value)
      return true
    },
    answer_4 (value: string) {
      if (next.value && validate.isRequired(value)) return validate.isRequired(value)
      return true
    },
    answer_5 (value: string) {
      if (next.value && validate.isRequired(value)) return validate.isRequired(value)
      return true
    },
    answer_6 (value: string) {
      if (next.value && validate.isRequired(value)) return validate.isRequired(value)
      return true
    },
  },
})
const sex = useField<string | null>('sex')
const age = useField<string | null>('age')
const status = useField<string | null>('status')
const education_level = useField<string | null>('education_level')
const occupation = useField<string | null>('occupation')
const working_period_agrofood = useField<string | null>('working_period_agrofood')
const type_sme = useField<string | null>('type_sme')
const working_period = useField<string | null>('working_period')
const num_personnel = useField<string | null>('num_personnel')
const email = useField('email')
const password = useField('password')
const confirmPassword = useField('confirmPassword')
// const answer_1 = useField<string[] | null>('answer_1')
const answer_1 = useField<string[] | null>('answer_1')
const answer_2 = useField<string[] | null>('answer_2')
const answer_3 = useField<string | null>('answer_3')
const answer_4 = useField<string | null>('answer_4')
const answer_5 = useField<string | null>('answer_5')
const answer_6 = useField<string | null>('answer_6')

const onSubmit = handleSubmit(async values => {
  console.log("send: ", values)
  // console.log("send 1: ", values.answer_1.toString())
  const params = {
    email: values.email,
    password: values.password,
    sex: values.sex,
    age: values.age,
    status: values.status,
    education_level: values.education_level,
    occupation: values.occupation,
    working_period_agrofood: values.working_period_agrofood,
    type_sme: values.type_sme,
    working_period: values.working_period,
    num_personnel: values.num_personnel,
    answer_1: values.answer_1.toString(),
    answer_2: values.answer_2.toString(),
    answer_3: values.answer_3,
    answer_4: values.answer_4,
    answer_5: values.answer_5,
    answer_6: values.answer_6
  }
  await user.fetchRegister(params)
  console.log("Register successful")
  navigateTo('/Login')
})

const onNext = handleSubmit(values => {
  next.value = true;
})
const onBack = () => {
  next.value = false;
}
const goToLogin = () => {
  navigateTo("/Login");
};

watchEffect(() => {
  if (password.value.value) {
    checkPassword.value = password.value.value.toString();
  }
});
</script>

<style scoped></style>
