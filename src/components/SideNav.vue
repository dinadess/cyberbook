<template>
  <aside
    class="bg-white text-writing py-8 px-6 shadow flex flex-col gap-4 w-full md:w-max text-center rounded-2xl mb-6 md:mb-0">
    <RouterLink to="/dashboard" class="py-2 px-8 rounded-2xl transition-colors flex items-center gap-1 justify-center">
      <Squares2X2Icon class="size-5" />
      Dashboard
    </RouterLink>
    <RouterLink to="/bookmarks" class="py-2 px-8 rounded-2xl transition-colors flex items-center gap-1 justify-center">
      <SparklesIcon class="size-5" />
      Mes favoris
    </RouterLink>
    <RouterLink to="/profile" class="py-2 px-8 rounded-2xl transition-colors flex items-center gap-1 justify-center">
      <UserCircleIcon class="size-5" />Mon profile
    </RouterLink>

    <button type="button"
      class="text-white bg-red-500 hover:bg-red-700 focus-visible:ring-4 focus-visible:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer flex items-center gap-1 justify-center mt-auto"
      @click="userStore.logout(router)">
      <ArrowUpOnSquareIcon class="size-6 rotate-90" />
      Déconnexion
    </button>

  </aside>
</template>

<script setup>
import { Squares2X2Icon, SparklesIcon, UserCircleIcon, ArrowUpOnSquareIcon } from '@heroicons/vue/24/outline'
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const userStore = useUserStore()
const router = useRouter()

</script>

<style scoped>
aside a:hover {
  background-color: var(--color-green-100);
}

aside a.router-link-exact-active {
  color: var(--color-white);
  background-color: var(--color-green-600);
}

aside a.router-link-exact-active:hover {
  background-color: var(--color-green-700);
}
</style>