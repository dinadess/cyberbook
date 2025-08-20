<template>
  <footer class="mt-auto bg-[#065F46] text-white py-5">
    <div class="container flex items-center justify-between gap-8 flex-wrap">
      <RouterLink to="/" class="flex items-center gap-1 w-max">
        <BookmarkIcon class="size-6 text-white" />
        <span class="font-semibold">CyberBook</span>
      </RouterLink>

      <ul class="flex items-center gap-6">
        <li>
          <RouterLink to="/#features">Features</RouterLink>
        </li>
        <li>
          <RouterLink to="/#FAQ">FAQ</RouterLink>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script setup>
import { BookmarkIcon } from '@heroicons/vue/24/outline'
</script>