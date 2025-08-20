<template>
  <AdminLayout class="mt-4">

    <div class="max-w-2xl mx-auto">
      <h1 class="text-3xl font-semibold mb-4">Mon profile</h1>

      <div>
        <div class="p-4 text-sm text-gray-800 mb-3 rounded-lg bg-gray-200 dark:bg-gray-800 dark:text-gray-300">

          <h2 class="font-medium text-xl">Nom d'utilisateur</h2>
          <p> {{ user?.name }}</p>
        </div>
        <div class="p-4 text-sm text-gray-800 rounded-lg bg-gray-200 dark:bg-gray-800 dark:text-gray-300">

          <h2 class="font-medium text-xl">Adresse mail</h2>
          <p> {{ user?.email }}</p>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from '@/components/AdminLayout.vue';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore()

const { user } = storeToRefs(userStore)
</script>