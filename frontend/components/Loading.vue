<template>
  <v-dialog v-model="prop.loading" persistent width="auto">
    <v-card width="300" class="tw-py-6">
      <v-card-text class="tw-text-2xl tw-text-center">
        <v-progress-circular
          color="success"
          indeterminate
          :size="76"
          :width="9"
        ></v-progress-circular>
        <br/>
        <div class="tw-mt-5">Loading...</div>
      </v-card-text>
      </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
interface Props {
  loading: boolean;
}
const prop = defineProps<Props>()

</script>

<style scoped>

</style>