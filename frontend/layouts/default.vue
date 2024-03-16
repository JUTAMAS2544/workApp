<template>
  <v-app class="font-custom">
    <Navbar />
    <v-main>
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