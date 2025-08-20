<template>
  <div class="relative">
    <input :type="showPassword ? 'text' : 'password'" id="password" :value="props.modelValue"
      @input="emit('update:modelValue', $event.target.value)"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:border-blue-500"
      minlength="6" required />

    <button type="button" class="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer p-1"
      @click="showPassword = !showPassword">
      <template v-if="!showPassword">
        <span class="sr-only">Voir mot de passe</span>
        <EyeIcon class="size-6" />
      </template>
      <template v-else>
        <span class="sr-only">Cacher mot de passe</span>
        <EyeSlashIcon class="size-6" />
      </template>
    </button>

  </div>
</template>

<script setup>
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue';

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const showPassword = ref(false)
</script>