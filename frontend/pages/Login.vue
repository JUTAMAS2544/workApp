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
              <!-- <v-btn variant="flat">Forgot password ?</v-btn> -->
              <p class="tw-text-blue-600 tw-text-right tw-cursor-pointer hover:tw-text-blue-400"  @click="toggleResetPassword = true">Forgot password ?</p>

              <v-btn
                rounded="xl"
                color="primary"
                class="tw-w-full tw-mt-5"
                type="submit"
              >
                Login
              </v-btn>
            </template>
            <template v-else>
              <v-text-field
                v-model="email"
                type="email"
                variant="outlined"
                label="E-mail"
              />
              <v-text-field
                v-model="password"
                :type="!showPassword? 'password' : 'text'"
                variant="outlined"
                label="Password"
                :append-inner-icon="showPassword?'mdi-eye-off' :'mdi-eye'"
                @click:append-inner="showPassword =!showPassword"
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
            </template>
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
const email = ref("");
const password = ref("");
const showPassword = ref(false);
const toggleResetPassword = ref(false);

// form


const onSubmit = async () => {
  // validator.value.$touch()
  const params = { email: email.value, password: password.value };
  await user.fetchLogin(params);
  await user.fetchAuth();

  if (user.getAuthToken) {
    navigateTo("/Assessment/Page-1");
  }
};
</script>

<style scoped></style>
