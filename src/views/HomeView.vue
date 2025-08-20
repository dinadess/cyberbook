<script setup lang="ts">
import HomeFAQ from '@/components/HomeFAQ.vue';
import HomeFeatures from '@/components/HomeFeatures.vue';
import { RouterLink } from 'vue-router';

</script>

<template>
  <div>
    <div class="grid grid-cols-1 lg:grid-cols-2 items-center gap-4">
      <section class="max-w-[42rem] py-18 flex flex-col justify-center items-start min-h-[calc(100dvh_-_72px)]">
        <h1 class="text-3xl md:text-5xl font-semibold mb-4">Retrouvez. Organisez. Et gérez tous vos favoris en un seul
          endroit.</h1>
        <p class="mb-8">CyberBook vous aide à sauvegarder, organiser et retrouver vos liens en toute simplicité. Fini
          les
          dizaines
          d'onglets ouverts ou les favoris perdus.
        </p>

        <RouterLink to="/login"
          class="text-white bg-secondary hover:bg-secondary-hover focus:ring-4 focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:hover:bg-secondary-hover-dark dark:focus:ring-violet-800 cursor-pointer inline-block">
          Essayer
          gratuitement</RouterLink>
      </section>
      <div class="w-full rotate-6 scale-105">
        <img src="/cyberbook-dark.png" alt="Dashboard en darkmode de Cyberbook"
          class="border-2 border-primary shadow-xl rounded-2xl">
      </div>

    </div>

    <HomeFeatures />

    <HomeFAQ />
  </div>
</template>