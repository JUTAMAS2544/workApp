<template>
  <v-container class="tw-flex tw-justify-center tw-items-center tw-h-full">
    <NuxtLink to="/Login">
      <v-btn color="primary" v-if="!user.getUserData">Login</v-btn>
    </NuxtLink>
    <div>
      {{ user.getUserData }}
    </div>
  </v-container>
</template>

<script setup lang="ts">
const user = useUser();


</script>

<style scoped>

</style>