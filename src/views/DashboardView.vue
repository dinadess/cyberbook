<template>
  <AdminLayout class="mt-4">
    <div class="md:grid lg:grid-cols-[380px_1fr] md:gap-6">
      <!-- Donut Chart -->
      <div class="mb-6 md:mb-0">
        <h1 class="text-3xl font-semibold mb-8">Statistiques des favoris</h1>

        <div
          class="w-full md:max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <template v-if="loading">
            <div class="size-60 rounded-full bg-gray-200 animate-pulse mx-auto mb-4"></div>
            <div class="h-4 w-24 bg-gray-300 mx-auto rounded animate-pulse"></div>
          </template>

          <DoughnutChart v-else-if="readingStats" :stats="readingStats" />

          <div v-else
            class="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert">
            <svg class="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <div>
              <span class="font-medium">Erreur!</span>Une erreur est survenue lors du chargement des données. Veuillez
              réessayer plus tard.
            </div>
          </div>
        </div>
      </div>

      <!-- Bar Chart -->
      <div>
        <h2 class="text-3xl font-semibold mb-8">Favoris par catégorie</h2>

        <div
          class="w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div v-if="loading" class="bg-white w-full max-w-md mx-auto p-6">
            <div class="flex items-end justify-center gap-2 h-40 animate-pulse ">
              <div class="w-6 bg-gray-300 rounded-t" style="height: 40%"></div>
              <div class="w-6 bg-gray-300 rounded-t" style="height: 70%"></div>
              <div class="w-6 bg-gray-300 rounded-t" style="height: 55%"></div>
              <div class="w-6 bg-gray-300 rounded-t" style="height: 85%"></div>
              <div class="w-6 bg-gray-300 rounded-t" style="height: 60%"></div>
            </div>
          </div>

          <CategoryChart v-else-if="categoryStats" :stats="categoryStats" />
        </div>
      </div>

    </div>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from '@/components/AdminLayout.vue';
import CategoryChart from '@/components/CategoryChart.vue';
import DoughnutChart from '@/components/DoughnutChart.vue';
import api from '@/services/axios';
import { onMounted, ref } from 'vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore()

const loading = ref(false)
const readingStats = ref({})
const categoryStats = ref([])

onMounted(async () => {
  await userStore.fetchUser()
  try {
    loading.value = true
    const { data: stats } = await api.get('/stats')

    readingStats.value = stats
    categoryStats.value = stats.byCategory;

  } catch (error) {
    console.log('error', error)
  } finally {
    loading.value = false
  }
})
</script>