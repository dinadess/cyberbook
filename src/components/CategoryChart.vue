<script setup>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js'
import { StarIcon } from '@heroicons/vue/24/outline'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const props = defineProps({
  stats: {
    type: Object,
    required: true
  }
})

const bgColors = [
  '#10B981', // Emerald 500 – vert principal
  '#6366F1', // Indigo 500 – secondaire
  '#F59E0B', // Amber 500 – orange/jaune
  '#3B82F6', // Blue 500 – bleu classique
  '#EF4444', // Red 500 – rouge vif
  '#8B5CF6', // Violet 500 – violet profond
  '#EC4899', // Pink 500 – rose flashy
  '#14B8A6', // Teal 500 – turquoise doux
  '#A855F7', // Purple 500 – violet plus clair
  '#F97316'  // Orange 500 – orange chaud
]

const stats = props.stats?.slice(0, 10)

const categories = stats?.map(c => c.category)
const counts = stats?.map(c => c.count)

const data = {
  labels: categories,
  datasets: [
    {
      label: 'Favoris par catégorie',
      data: counts,
      backgroundColor: bgColors.splice(0, stats.length)
    }
  ]
}
</script>

<template>
  <div v-if="!stats.length" class="text-center text-gray-500 py-10">
    <StarIcon class="w-12 h-12 mx-auto text-green-400 mb-5" />
    <p class="font-semibold">Aucune catégorie trouvée</p>
    <p class="text-sm">Ajoutez des favoris pour les visualiser par catégorie.</p>
  </div>

  <Bar v-else :data="data" />
</template>
