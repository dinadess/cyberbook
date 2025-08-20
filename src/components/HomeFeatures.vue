<template>
  <div id="features" class="py-10">
    <section class="max-w-[50rem] text-center mx-auto">
      <h2 class="text-2xl md:text-4xl mb-4 font-semibold">Fonctionnalités clés</h2>
      <p class="mb-8">CyberBook vous aide à organiser, retrouver et partager vos favoris facilement, où que vous soyez.
      </p>
    </section>

    <div>
      <ul class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[850px] mx-auto">
        <li v-for="item in features" :key="item.id" class="flex flex-col max-w-[25rem] p-6 bg-white rounded-3xl shadow">
          <component :is="item.icon" class="size-10 text-indigo-600 mb-4" />
          <h3 class="text-lg font-semibold mb-1 text-writing">{{ item.title }}</h3>
          <p class="text-writing">{{ item.description }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { FolderIcon, MagnifyingGlassIcon, ArrowPathIcon, LockClosedIcon } from '@heroicons/vue/24/outline';

const iconsMap = {
  folder: FolderIcon,
  'magnifying-glass': MagnifyingGlassIcon,
  'arrow-path': ArrowPathIcon,
  'lock-closed': LockClosedIcon
}

const features = [
  {
    id: 'organisation',
    title: 'Organisation intuitive',
    description: 'Classez vos favoris par dossiers, tags ou favoris épinglés.',
    icon: iconsMap['folder']
  },
  {
    id: 'recherche',
    title: 'Recherche rapide',
    description: 'Trouvez instantanément vos liens grâce à une recherche puissante.',
    icon: iconsMap['magnifying-glass']
  },
  {
    id: 'synchronisation',
    title: 'Synchronisation multi-appareils',
    description: 'Accédez à vos favoris partout, sur mobile, tablette et desktop.',
    icon: iconsMap['arrow-path']
  },
  {
    id: 'partage',
    title: 'Partage sécurisé',
    description: 'Partagez vos collections avec vos proches ou collègues facilement.',
    icon: iconsMap['lock-closed']
  }
]

</script>