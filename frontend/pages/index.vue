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

// const fetchUsers = async () => {
//   try {
//     isLoading.value = true
//     const { data } = await axios.get(`${import.meta.env.VITE_API}/user/all/`)
//     // users.value = data
//     console.log(data)
//     isLoading.value = false
//   } catch (error) {
//     console.log(error)
//   }
// }

</script>

<style scoped>

</style>