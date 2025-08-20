<script setup>
import AdminLayout from '@/components/AdminLayout.vue';
import CreateBookmarkModal from '@/components/CreateBookmarkModal.vue';
import api from '@/services/axios';
import { DocumentCheckIcon, InboxIcon, TrashIcon } from '@heroicons/vue/24/outline';
import { onMounted, ref } from 'vue';
import { statusColors } from '@/utils/StatusColors';
import DeleteWarning from '@/components/ConfirmationWarning.vue';
import { useToast } from 'vue-toast-notification';

const bookmarks = ref([])
const loading = ref(false)

const showActionsModal = ref(false)

const fetchBookmarks = async function () {
  try {
    loading.value = true
    const res = await api.get('/bookmarks')

    bookmarks.value = res?.data;
  } catch (error) {
    console.log('error', error)
  } finally {
    loading.value = false
  }
}

const actionBookmark = ref({
  id: null,
  action: ''
})

const onActionClick = function (id) {
  actionBookmark.value.id = id;
  showActionsModal.value = true
}

onMounted(async () => {
  await fetchBookmarks()
})

const actionLoading = ref(false)

const asyncAction = async function () {
  try {
    actionLoading.value = true

    if (actionBookmark.value.action === 'delete') {
      await api.delete(`/bookmarks/${actionBookmark.value.id}`)
    } else {
      await api.patch(`/bookmarks/${actionBookmark.value.id}`, { "status": "read" })
    }

    actionBookmark.value.id = null
    actionBookmark.value.action = ''
    showActionsModal.value = false

    await fetchBookmarks()
  } catch (error) {
    const $toast = useToast();
    $toast.error('Une erreur est survenue. Veuillez réessayer plus tard.');

    console.log('error', error)
  } finally {
    actionLoading.value = false
  }
}

</script>

<template>
  <AdminLayout class="mt-4">
    <div>
      <section class="flex items-center justify-between gap-4  mb-8">
        <h1 class="text-3xl font-semibold">Mes favoris ({{ bookmarks?.length }})</h1>

        <CreateBookmarkModal @bookmark-added="fetchBookmarks" />
      </section>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-green-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Titre
              </th>
              <th scope="col" class="px-6 py-3">
                URL
              </th>
              <th scope="col" class="px-6 py-3">
                Categorie
              </th>
              <th scope="col" class="px-6 py-3">
                Statut
              </th>
              <th scope="col" class="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            <template v-if="loading">
              <tr v-for="i in 7" :key="i" class="animate-pulse">
                <td class="px-4 py-3">
                  <div class="h-4 bg-gray-300 rounded w-3/4"></div>
                </td>
                <td class="px-4 py-3">
                  <div class="h-4 bg-gray-300 rounded w-2/3"></div>
                </td>
                <td class="px-4 py-3">
                  <div class="h-4 bg-gray-300 rounded w-2/3"></div>
                </td>
                <td class="px-4 py-3">
                  <div class="h-4 bg-gray-300 rounded w-1/2"></div>
                </td>
                <td class="px-4 py-3">
                  <div class="h-4 bg-gray-300 rounded w-1/2"></div>
                </td>
              </tr>
            </template>

            <template v-else-if="!bookmarks.length">
              <tr class="text-center py-8 text-gray-500 dark:text-gray-400 mx-auto">
                <td colspan="5" class="p-5">
                  <InboxIcon class="mx-auto w-10 h-10 text-gray-400" />
                  <p class="mt-2">Aucune donnée disponible.</p>
                </td>
              </tr>
            </template>

            <template v-else>
              <tr v-for="item in bookmarks" :key="item?.id"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {{ item?.title }}
                </th>
                <td class="px-6 py-4 overflow-hidden text-ellipsis max-w-xs">
                  <a :href="item?.url" class="text-blue-600 underline underline-offset-1">{{ item?.url }}</a>
                </td>
                <td class="px-6 py-4">
                  {{ item?.category }}
                </td>
                <td class="px-6 py-4">
                  <span
                    :class="`${statusColors[item?.status].text} ${statusColors[item?.status].bg} px-3 py-1.5 rounded-xl`">
                    {{ item?.status }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <!-- <button type="button" class="font-medium cursor-pointer p-0.5 transition-shadow hover:shadow"
                    title="Modifier">
                    <PencilSquareIcon class="text-blue-500 size-5.5
                    " />
                    <span class="sr-only">Modifier</span>
                  </button> -->
                  <CreateBookmarkModal @bookmark-added="fetchBookmarks" action="update" />
                  <button v-if="item.status !== 'read'" type="button"
                    class="font-medium cursor-pointer p-0.5 transition-shadow hover:shadow" title="Marquer comme lu">
                    <DocumentCheckIcon class="text-green-500 size-5.5" @click="onActionClick(item.id, 'delete')" />
                    <span class="sr-only">Marquer comme lu</span>
                  </button>
                  <button type="button" class="font-medium cursor-pointer p-0.5 transition-shadow hover:shadow"
                    title="Supprimer" @click="onActionClick(item.id, 'update')">
                    <TrashIcon class="text-red-500 size-5.5" />
                    <span class="sr-only">Supprimer</span>
                  </button>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>

      <DeleteWarning :showModal="showActionsModal" @cancel-action="showActionsModal = false"
        @confirm-action="asyncAction" :loading="actionLoading" />
    </div>
  </AdminLayout>
</template>
