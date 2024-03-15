<template>
  <v-app class="font-custom">
    <Navbar />
    <v-main class="md:tw-mt-8">
        <NuxtPage />
    </v-main>
    <FooterBar />
  </v-app>
</template>

<script setup lang="ts">

</script>

<style>
  .font-custom {
    font-family: 'Prompt', sans-serif;
  }
</style>