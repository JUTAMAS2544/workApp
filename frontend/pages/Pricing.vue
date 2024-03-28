<template>
  <div class="tw-py-10 tw-px-5 md:tw-px-12 tw-bg-[#D9F4DF] tw-h-full">
    <div class="tw-flex tw-flex-wrap tw-justify-center tw-gap-8">
      <template v-for="item in data" :key="item.id">
        <v-card class="tw-w-[300px] tw-rounded-3xl tw-px-5 tw-py-10 tw-text-[#006553] tw-h-[550px]" :elevation="3">
          <v-card-title class="tw-text-[#00CEA9] tw-text-2xl tw-uppercase tw-font-semibold tw-tracking-widest">
            {{ item.title }}
          </v-card-title>
          <v-card-subtitle class="tw-my-4 tw-text-lg tw-font-medium tw-opacity-100">
            {{ item.subtitle }}
          </v-card-subtitle>
          <v-card-text>
            <template v-for="i in item.text">
              <div class="tw-flex tw-gap-x-2" >
                <v-icon icon="mdi-check" color="#00CEA9" size="large"></v-icon>
                <p class="tw-mb-2">
                  {{ i }}
                </p>
              </div>
            </template>
          </v-card-text>
        </v-card>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">

const data = [
  {
    id: 1,
    title: 'Basic',
    subtitle: 'Free',
    text: [
      'Index Evaluation',
      'Business and Technology Suggestions',
    ]
  },
  {
    id: 2,
    title: 'Intermediate',
    subtitle: 'x,xxx baht/month',
    text: [
      'Index Evaluation',
      'Business and Technology Suggestions',
      'In-depth Suggestion',
      'One-time On-site Consulting Service'
    ]
  },
  {
    id: 3,
    title: 'Pro',
    subtitle: 'xx,xxx baht/month',
    text: [
      'Index Evaluation',
      'Business and Technology Suggestions',
      'In-depth Suggestion',
      '24-7 Online Assisstant',
      'Six-month On-site Consulting Service',
      'Agrifood Technology Implementation Consultant',
      'Agrifood Brand Consultant'
    ]
  },
]

</script>

<style scoped>

</style>