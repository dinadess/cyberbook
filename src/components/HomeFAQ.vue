<template>
  <div id="FAQ" class="py-16 max-w-[50rem] mx-auto">
    <section class="text-center">
      <h2 class="text-2xl md:text-4xl mb-4 font-semibold">Foire Aux Questions</h2>
      <p class="mb-8">Toutes les réponses à vos questions sur CyberBook.
      </p>
    </section>

    <div id="accordion-color" data-accordion="collapse"
      data-active-classes="bg-primary-100 dark:bg-gray-800 text-blue-600 dark:text-white">

      <template v-for="item in faq" :key="item.id">
        <h2 :id="`${item.id}--heading`">
          <button type="button"
            class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border  border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800 gap-3"
            :data-accordion-target="`#${item.id}--body`" aria-expanded="true" :aria-controls="`${item.id}--body`">
            <span>{{ item.question }}</span>
            <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 5 5 1 1 5" />
            </svg>
          </button>
        </h2>
        <div :id="`${item.id}--body`" class="hidden" :aria-labelledby="`${item.id}--heading`">
          <div class="p-5 border border-gray-200 dark:border-gray-700 dark:bg-gray-900">
            <p class="mb-2 text-gray-500 dark:text-gray-400">{{ item.answer }}</p>
          </div>
        </div>
      </template>
    </div>

  </div>
</template>

<script setup>
const faq = [
  {
    id: 'faq-1',
    question: "Comment créer un nouveau dossier ou tag pour organiser mes favoris ?",
    answer: "Vous pouvez créer autant de dossiers et tags que vous souhaitez directement depuis l’interface principale. Il suffit de cliquer sur “Ajouter un dossier” ou “Créer un tag” et de nommer votre catégorie."
  },
  {
    id: 'faq-2',
    question: "CyberBook est-il gratuit ?",
    answer: "Oui, CyberBook propose une version gratuite avec toutes les fonctionnalités essentielles. Des options premium pourront être ajoutées à l’avenir."
  },
  {
    id: 'faq-3',
    question: "Mes favoris sont-ils synchronisés entre mes appareils ?",
    answer: "Absolument ! Vos favoris sont automatiquement synchronisés en temps réel entre tous vos appareils connectés."
  },
  {
    id: 'faq-4',
    question: "Puis-je partager mes favoris avec d’autres utilisateurs ?",
    answer: "Oui, vous pouvez partager vos dossiers ou collections de favoris avec vos amis ou collègues via un lien sécurisé."
  },
  {
    id: 'faq-5',
    question: "Comment sécurisez-vous mes données ?",
    answer: "Nous utilisons un chiffrement avancé pour protéger vos données, et nous ne partageons jamais vos informations avec des tiers."
  },
  {
    id: 'faq-6',
    question: "Est-ce que CyberBook fonctionne sur mobile ?",
    answer: "Oui, CyberBook est optimisé pour une utilisation fluide sur smartphones et tablettes."
  }
]

</script>