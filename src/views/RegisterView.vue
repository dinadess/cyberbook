<template>
  <div class="max-w-[40rem] text-writing bg-white shadow rounded-3xl my-10 p-10 mx-auto">
    <h1 class="text-3xl font-semibold mb-2">Inscription</h1>
    <p class="mb-6 text-base">Rejoignez CyberBook et gardez tous vos liens à portée de main.</p>

    <LoginError :serverError="serverError" />

    <form class="mx-auto mb-6" @submit.prevent="onSubmit">
      <!-- Name Input -->
      <div class="mb-5">
        <label for="name" class="block mb-2 font-medium">Nom d'utilisateur</label>
        <input type="text" id="name" v-model.trim="user.name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="John Doe" required />

        <p v-if="errors?.name" class="text-red-600 text-base">{{ errors.name[0] }}</p>
      </div>

      <!-- Email Address Input -->
      <div class="mb-5">
        <label for="email" class="block mb-2 font-medium">Adresse mail</label>
        <input type="email" id="email" v-model.trim="user.email"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="john.doe@gmail.com" required />

        <p v-if="errors?.email" class="text-red-600 text-base">{{ errors.email[0] }}</p>
      </div>

      <!-- Password Input -->
      <div class="mb-5">
        <label for="password" class="block font-medium">Mot de passe</label>
        <span class="text-sm mb-2">(Doit contenir au moins 6 caractères)</span>

        <PasswordInput v-model:model-value="user.password" />

        <p v-if="errors?.password" class="text-red-600 text-base">{{ errors.password[0] }}</p>
      </div>
      <button type="submit"
        :class="`text-white bg-secondary hover:bg-secondary-hover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-full sm:w-auto px-5 py-2.5 text-center dark:hover:bg-secondary-hover-dark dark:focus:ring-violet-800 cursor-pointer ${loading ? 'cursor-not-allowed' : ''}`"
        :disabled="loading">
        <span v-if="loading" class="flex items-center gap-2">
          <ArrowPathIcon class="animate-spin size-5 font-semibold" /> Inscription en cours...
        </span>
        <span v-else>S'inscrire</span>
      </button>
    </form>

    <p class="text-base">Déjà inscrit ? <RouterLink to="/login" class="text-blue-500 underline">Connectez-vous ici.
      </RouterLink>
    </p>
  </div>
</template>

<script setup>
import * as z from 'zod'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowPathIcon } from '@heroicons/vue/24/outline'
import LoginError from '@/components/AuthError.vue'
import api from '@/services/axios'
import PasswordInput from '@/components/PasswordInput.vue'
import { useToast } from 'vue-toast-notification'

z.config(z.locales.fr())
const router = useRouter()

const user = ref({
  name: '',
  email: '',
  password: ''
})
const errors = ref({})
const serverError = ref(null)

const userFormSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.email(),
  password: z.string().min(6).max(50)
})

const validateForm = () => {
  const result = userFormSchema.safeParse(user.value)

  // console.log('result', result.error.flatten())
  if (!result.success) {
    errors.value = result.error.flatten().fieldErrors;
    return false
  }

  errors.value = {}
  return true
}

const loading = ref(false);

const onSubmit = async function () {
  if (validateForm()) {
    try {
      loading.value = true;
      serverError.value = '';

      await api.post('/auth/register', user.value)

      router.push('/dashboard')

      const $toast = useToast();
      $toast.success('Inscription réussie 🎉. Connectez-vous à présent pour accéder à votre dashboard.');
    } catch (error) {
      serverError.value = error?.response?.data?.error
      console.log('error', error)
    } finally {
      loading.value = false
    }
  }
}
</script>

<style scoped>
label::after {
  content: "*";
  color: red;
  font-size: 1.125rem;
  font-weight: bold;
  margin-left: 0.25rem;
}
</style>
