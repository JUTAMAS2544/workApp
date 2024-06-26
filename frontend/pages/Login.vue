<template>
  <Loading :loading="isLoading" />
  <div class="tw-bg-[url('/bg-login.png')] tw-bg-cover tw-bg-center tw-h-full">
    <v-container class="tw-flex tw-justify-center tw-items-center tw-h-full">
      <v-card class="tw-py-5 tw-px-5 md:tw-py-6 md:tw-px-10 tw-rounded-3xl" max-width="565">
        <v-card-item>
          <v-card-title v-if="!toggleResetPassword" class="tw-text-center tw-text-xl md:tw-text-2xl tw-font-semibold">
            Login to your account
          </v-card-title>
          <v-card-title v-else class="tw-text-center tw-text-xl md:tw-text-2xl tw-font-semibold">
            Change your password
          </v-card-title>
        </v-card-item>
        <v-card-text class="tw-mt-3">

          <form @submit.prevent="onSubmit">
            <!-- Login -->
            <template v-if="!toggleResetPassword">
              <v-text-field
                v-model="email.value.value"
                type="email"
                density="comfortable"
                variant="outlined"
                label="E-mail"
                :error-messages="email.errorMessage.value"
              />
              <v-text-field
                class="tw-my-2"
                v-model="password.value.value"
                :type="!showPassword ? 'password' : 'text'"
                density="comfortable"
                variant="outlined"
                label="Password"
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showPassword = !showPassword"
                :error-messages="password.errorMessage.value"
              />
              <p
                class="tw-text-blue-600 tw-text-right tw-cursor-pointer hover:tw-text-blue-400"
                @click="goSwich"
              >
                Forgot password ?
              </p>

              <v-btn
                rounded="xl"
                color="primary"
                size="large"
                class="tw-w-full tw-mt-5"
                type="submit"
              >
                Login
              </v-btn>
              <p class="tw-text-center tw-mt-5 tw-text-gray-400">
                Don't have an account?
                <span class="tw-text-blue-600 hover:tw-text-blue-400 tw-cursor-pointer" @click="goToRegister">Create Account</span>
              </p>
            </template>

            <!-- Change Password -->
            <template v-else>
              <v-text-field
                v-model="email.value.value"
                type="email"
                density="comfortable"
                variant="outlined"
                label="E-mail"
                :error-messages="email.errorMessage.value"
              />
              <v-text-field
                class="tw-my-2"
                v-model="password.value.value"
                :type="!showNewPassword ? 'password' : 'text'"
                density="comfortable"
                variant="outlined"
                label="Password"
                :append-inner-icon="showNewPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showNewPassword = !showNewPassword"
                :error-messages="password.errorMessage.value"
              />
              <v-text-field
                class="tw-mb-2"
                v-model="confirmPassword"
                :type="!showConfirmPassword ? 'password' : 'text'"
                density="comfortable"
                variant="outlined"
                label="Confirm Password"
                :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showConfirmPassword = !showConfirmPassword"
                :error-messages="confirmPasswordError"
              />

              <div class="tw-grid tw-grid-cols-2 tw-gap-x-4 tw-justify-center">
                <v-btn
                  rounded="xl"
                  color="#006A24"
                  size="large"
                  class="tw-mt-5 tw-w-full"
                  @click="goSwich"
                >
                  Back
                </v-btn>
                <v-btn
                  rounded="xl"
                  color="#FFC700"
                  size="large"
                  class="tw-mt-5 tw-w-full tw-text-white"
                  @click="handleChangePassword"
                >
                  Confirm
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
import { useValidate } from '~/stores/validate';

definePageMeta({
  middleware: ["auth"],
});

const user = useUser();
const validate = useValidate();
const isLoading = ref(false)
const checkPassword = ref('')
const showPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);
const toggleResetPassword = ref(false);

// form validation
const { handleSubmit } = useForm({
  validationSchema: {
    email (value: string) {
      if (validate.isRequired(value)) return validate.isRequired(value)
      if (validate.isEmail(value)) return validate.isEmail(value)

      return true
    },
    password (value: string) {
      if (validate.isRequired(value)) return validate.isRequired(value)
      if (validate.isPassword(value)) return validate.isPassword(value)
      return true
    },
  },
})

const email = useField('email')
const password = useField('password')
const confirmPassword = ref('')
const confirmPasswordError = ref('')

const onSubmit = handleSubmit(async values => {
  const params = { email: values.email, password: values.password };

  isLoading.value = true;
  await user.fetchLogin(params);
  if (user.getAuthToken  !== "error") {
    await user.fetchAuth();
  }
  isLoading.value = false;
  navigateTo("/Assessment/PageStart");
  // if (user.getAuthToken) {
  //   navigateTo("/Assessment/PageStart");
  // }
})
const handleChangePassword = handleSubmit(async values => {

  if (confirmPasswordError.value !== '') return;

  const params = { email: values.email, newPassword: values.password };

  isLoading.value = true;
  await user.changePassword(params);
  if (user.getCheckChangePassword?.status === 'error') {
    toggleResetPassword.value = true;
  } else {
    toggleResetPassword.value = false;
    email.value.value = ''
    password.value.value = ''
    confirmPassword.value = ''
  }

  isLoading.value = false;

})
const goSwich = () => {
  email.value.value = ''
  password.value.value = ''
  confirmPassword.value = ''
  toggleResetPassword.value = !toggleResetPassword.value
}
const goToRegister = () => {
  navigateTo("/Register");
}

watchEffect(() => {
  if (password.value.value) {
    checkPassword.value = password.value.value.toString();
  }
});
watchEffect(() => {
  if (!confirmPassword.value && checkPassword.value) {
    confirmPasswordError.value = 'ต้องกรอก'
  }else if (confirmPassword.value!== checkPassword.value) {
    confirmPasswordError.value = 'รหัสผ่านไม่ถูกต้อง'
  } else {
    confirmPasswordError.value = ''
  }
})

watchEffect(()=> {
  if (user.getUserData) {
    navigateTo("/Assessment/PageStart");
  }
})
</script>

<style scoped></style>
