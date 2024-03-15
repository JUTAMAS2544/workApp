<template>
  <v-container>
    <NuxtLink to="/Login">
      <v-btn color="primary" v-if="!user.getUserData">Login</v-btn>
    </NuxtLink>
    {{ user.getUserData }}
  </v-container>
</template>

<script setup lang="ts">
const user = useUser();

const isLoading = ref(false)

</script>

<style scoped>

</style>