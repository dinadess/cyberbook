<script setup>
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { ChartBarIcon } from '@heroicons/vue/24/outline'

ChartJS.register(ArcElement, Tooltip, Legend)

const props = defineProps({
  stats: {
    type: Object,
    required: true,
  }
})

const data = {
  labels: ['Lus', 'En cours', 'Non lus'],
  datasets: [
    {
      label: 'Favoris',
      data: [
        props.stats.read,
        props.stats.reading,
        props.stats.unread
      ],
      backgroundColor: [
        '#10B981', // Vert émeraude — couleur principale (Emerald 500)
        '#6366F1', // Indigo vif — couleur secondaire (Indigo 500)
        '#F59E0B'  // Jaune orangé — accent chaud (Amber 500)
      ],
      borderWidth: 1
    }
  ]
}
</script>

<template>
  <div v-if="props.stats?.total === 0" class="text-center py-10 text-gray-500">
    <ChartBarIcon class="w-12 h-12 mx-auto text-green-400 mb-5" />
    <p>Aucune statistique disponible pour le moment. Ajoute des favoris pour commencer à suivre ta progression.</p>
    <RouterLink to="/bookmarks"
      class="mt-4 inline-block bg-primary text-white px-4 py-2 rounded hover:bg-primary-hover">
      Ajouter un favori
    </RouterLink>
  </div>

  <Doughnut v-else :data="data" class="max-h-[30rem] max-w-[400px]" />
</template>
