<template>
  <!-- <header :class="`${user ? 'bg-white' : ''}`"> -->
  <header>
    <div class="container py-4 flex items-center gap-4 justify-center flex-wrap sm:justify-between">

      <RouterLink to="/" class="flex items-center gap-1 w-max">
        <BookmarkIcon class="size-6" />
        <span class="font-semibold">CyberBook</span>
      </RouterLink>

      <nav>
        <ul class="flex items-center gap-6">
          <li><a href="#features">Features</a></li>
          <li><a href="#FAQ">FAQ</a></li>
          <li v-if="user" class="flex items-center gap-2">
            <RouterLink to="/dashboard"><span>{{ user?.name }}</span></RouterLink>
            <div class="size-10 rounded-full text-white bg-green-400 flex items-center justify-center">{{ userInitials
            }}</div>
          </li>
          <li v-else>
            <RouterLink to="/login"
              class="text-white bg-primary hover:bg-primary-hover focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:hover:bg-primary-hover-dark focus:outline-none dark:focus:ring-green-800 cursor-pointer">
              Connexion</RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
import { BookmarkIcon } from '@heroicons/vue/24/outline'
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const userStore = useUserStore()

const { user, userName } = storeToRefs(userStore);

const userInitials = ref('')

userName.value?.split(' ').forEach((item, index) => {
  if (index === 2) return;
  userInitials.value += item.at(0)
})
</script>

<style scoped>
li a:hover {
  border-bottom: 2px solid inherit;
}
</style>