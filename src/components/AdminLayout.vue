<script setup lang="ts">
import SideNav from './SideNav.vue';

</script>

<template>
  <div class="mt-4 mb-8 md:grid md:grid-cols-[220px_1fr] gap-6">
    <SideNav />

    <div class="w-full">
      <slot />
    </div>
  </div>
</template>