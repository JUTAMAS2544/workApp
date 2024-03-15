<template>
  <div class="tw-bg-black tw-h-full">
    <v-container class="tw-flex tw-justify-center tw-items-center tw-h-full">
      <v-card class="tw-p-6" max-width="565">
        <v-card-item>
          <v-card-title class="tw-text-center tw-text-2xl tw-font-semibold">
            Login to your account
          </v-card-title>
        </v-card-item>
        <v-card-text class="tw-mt-3">
          <!-- <p class="tw-text-base">ข้อมูลทั่วไป</p>
          <v-divider :thickness="2" class="tw-opacity-1" /> -->

          <form @submit.prevent="onSubmit">
            <template v-if="!toggleResetPassword">
              <v-text-field
                v-model="email.value.value"
                type="email"
                variant="outlined"
                label="E-mail"
                :error-messages="email.errorMessage.value"
              />
              <v-text-field
                class="tw-my-2"
                v-model="password.value.value"
                :type="!showPassword ? 'password' : 'text'"
                variant="outlined"
                label="Password"
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showPassword = !showPassword"
                :error-messages="password.errorMessage.value"
              />
              <p
                class="tw-text-blue-600 tw-text-right tw-cursor-pointer hover:tw-text-blue-400"
                @click="toggleResetPassword = true"
              >
                Forgot password ?
              </p>

              <v-btn
                rounded="xl"
                color="primary"
                class="tw-w-full tw-mt-5"
                type="submit"
              >
                Login
              </v-btn>
            </template>
            <!-- <template v-else>
              <v-text-field
                v-model="email"
                type="email"
                variant="outlined"
                label="E-mail"
              />
              <v-text-field
                v-model="password"
                :type="!showPassword ? 'password' : 'text'"
                variant="outlined"
                label="Password"
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showPassword = !showPassword"
              />
              <div class="tw-mx-auto tw-w-full md:tw-flex md:tw-items-center">
                <v-btn
                  rounded="xl"
                  color="error"
                  class="tw-w-full tw-mt-5"
                  @click="toggleResetPassword = false"
                >
                  กลับ
                </v-btn>
                <v-btn
                  rounded="xl"
                  color="primary"
                  class="tw-w-full tw-mt-5"
                  type="submit"
                >
                  เปลี่ยนรหัสผ่าน
                </v-btn>
              </div>
            </template> -->
          </form>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate'

definePageMeta({
  middleware: ["auth"],
});

const user = useUser();
const showPassword = ref(false);
const toggleResetPassword = ref(false);

// form
// const validateEmail = (value: string) => {
//   // if the field is empty
//   if (!value) {
//     return "This field is required";
//   }
//   // if the field is not a valid email
//   const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
//   if (!regex.test(value)) {
//     return "This field must be a valid email";
//   }
//   // All is good
//   return true;
// };
const { handleSubmit } = useForm({
  validationSchema: {
    email (value: string) {
      if (!value) return 'ต้องกรอก'
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

      return 'โปรดตรวจสอบความถูกต้องของอีเมล'
    },
    password (value: string) {
      if (!value) return 'ต้องกรอก'
      if (value.length < 8) return 'ต้องมีอย่างน้อย 8 ตัวอักษร'
      return true
    }
  },
})

const email = useField('email')
const password = useField('password')

const onSubmit = handleSubmit(async values => {
  const params = { email: values.email, password: values.password };

  await user.fetchLogin(params);
  await user.fetchAuth();

  if (user.getAuthToken) {
    navigateTo("/Assessment/Page-1");
  }
})
// const onSubmit = async () => {
//   // validator.value.$touch()
//   // const params = { email: email.value, password: password.value };
//   // await user.fetchLogin(params);
//   await user.fetchAuth();

//   if (user.getAuthToken) {
//     navigateTo("/Assessment/Page-1");
//   }
// };
</script>

<style scoped></style>
