<script setup>
import { RouterView } from 'vue-router'
import { useUserStore } from '@/stores/user';
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';
import { onMounted } from 'vue';

const userStore = useUserStore()

onMounted(async () => {
  await userStore.fetchUser()
})
</script>

<template>
  <TheHeader />

  <main class="container">
    <RouterView />
  </main>

  <TheFooter />
</template>

<style scoped>
.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}
</style>
