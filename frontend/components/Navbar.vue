<template>
  <v-app-bar fixed app color="#3F3C00" class="tw-py-1 tw-px-3 md:tw-py-4 md:tw-px-5">
    <template v-slot:prepend>
      <NuxtLink to="/" class="tw-mr-10 tw-hidden md:tw-block">
        <img src="/Logo.png" alt="Logo" width="180">
      </NuxtLink>
      <!-- Mobile -->
    <v-menu transition="scale-transition">
      <template v-slot:activator="{ props }">
          <v-app-bar-nav-icon size="x-large" density="comfortable" class="md:tw-hidden" v-bind="props"></v-app-bar-nav-icon>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, i) in menus"
          :key="i"
        >
        <NuxtLink :to="item.path">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </NuxtLink>
        </v-list-item>
      </v-list>
    </v-menu>
    </template>

    <p class="md:tw-hidden tw-text-lg">{{ text }}</p>

    <!-- Desktop -->
    <div class="tw-hidden md:tw-block">
      <NuxtLink to="/Assessment/Page-1">
        <v-btn class="hover:tw-text-[#ffe68e] tw-text-xl" :class="menu.getPath === 1 ? 'tw-text-[#ffcd1a]': ''">Index Assessment</v-btn>
      </NuxtLink>
      <NuxtLink to="/">
        <v-btn class="hover:tw-text-[#ffe68e] tw-text-xl">Plans & Pricing</v-btn>
      </NuxtLink>
      <NuxtLink to="/">
        <v-btn class="hover:tw-text-[#ffe68e] tw-text-xl">Contact us</v-btn>
      </NuxtLink>
    </div>

    <v-spacer />

    <v-btn icon size="x-large" density="comfortable" v-if="user.getUserData" @click="handelLogout">
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useActive } from '~/stores/active.store';

const user = useUser();
const menu = useActive();

const menus = [
  { title: 'Home', path: '/' },
  { title: 'Index Assessment', path: '/Assessment/Page-1' },
  { title: 'Plans & Pricing', path: '/' },
  { title: 'Contact us', path: '/' },
]

const text = computed(() => {
  switch (menu.getPath) {
    case 0:
      return 'Home';
    case 1:
      return 'Index Assessment';
    case 2:
      return 'Plans & Pricing';
    case 3:
      return 'Contact us';
    default:
      return 'Login';
  }
})
const handelLogout = () => {
  user.logout();
};
</script>

<style scoped>
.text {
  font-size: 20px;
}
</style>
