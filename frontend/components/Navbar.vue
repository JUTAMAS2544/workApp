<template>
  <v-app-bar fixed app color="#3F3C00" class="tw-py-1 tw-px-3 md:tw-px-5">
    <template v-slot:prepend>
      <NuxtLink to="/" class="tw-mr-10 tw-hidden md:tw-block">
        <img src="/Logo.png" alt="Logo" width="130">
      </NuxtLink>
      <!-- Mobile -->
    <v-menu transition="slide-y-transition">
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
      {{ menu.getPath }} {{ activeMenu }}
      <NuxtLink to="/Assessment/PageStart">
        <v-btn class="hover:tw-text-[#ffe68e] tw-text-lg" :class="activeMenu === 1 ? 'tw-text-[#ffcd1a]': ''">Index Assessment</v-btn>
      </NuxtLink>
      <NuxtLink to="/Pricing">
        <v-btn class="hover:tw-text-[#ffe68e] tw-text-lg" :class="activeMenu === 2 ? 'tw-text-[#ffcd1a]': ''">Plans & Pricing</v-btn>
      </NuxtLink>
      <NuxtLink to="/">
        <v-btn class="hover:tw-text-[#ffe68e] tw-text-lg">Contact us</v-btn>
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
  { title: 'Index Assessment', path: '/Assessment/PageStart' },
  { title: 'Plans & Pricing', path: '/Pricing' },
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
const activeMenu = computed(() => {
  if (menu.getPath) return menu.getPath;
  return 0;
})
const handelLogout = () => {
  user.logout();
  navigateTo('/')
};
</script>

<style scoped>

</style>
