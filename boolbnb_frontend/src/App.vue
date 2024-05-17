<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onBeforeMount, ref, onMounted } from 'vue';
import { useApiStore } from './stores/apiStore';
import { useUtilityStore } from './stores/utilityStore';
import axios from 'axios';
import LoginVue from './components/LoginVue.vue';
import RegisterVue from './components/RegisterVue.vue';
import UserMessages from './components/UserMessages.vue';

const utility_store = ref(useUtilityStore())
const api_store = ref(useApiStore())

onMounted(async () => {
  const storedUser = localStorage.getItem('user');
  const storedToken = localStorage.getItem('auth_token');
  if (storedUser) {
    api_store.value.user = JSON.parse(storedUser)
  }
  if (storedToken) {
    api_store.value.auth_token = JSON.parse(storedToken);
  }
  if (api_store.value.user) {
    api_store.value.getUserMessages()
  }
})

</script>

<template>
  <header>
    <RouterView />
  </header>
  <!-- <UserMessages></UserMessages> -->
  <LoginVue v-if="utility_store.show_login"></LoginVue>
  <RegisterVue v-if="utility_store.show_register"></RegisterVue>
</template>

<style scoped></style>
