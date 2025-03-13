<template>
  <div class="bg-white">
    <!-- Navigation -->
    <Navigation />
    <!-- Header -->
    <div class="mx-auto max-w-7xl px-6 pt-24 pb-8 sm:pt-32 lg:px-8">
      <div class="mx-auto max-w-4xl text-center">
        <h1 class="text-base font-semibold leading-7 text-blue-600">Nos Prix</h1>
        <p class="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Trouver le plan idéal pour votre entreprise
        </p>
      </div>
      <p class="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
        Options de tarifs flexibles conçu pour suivre les demandes de votre organisation.
      </p>
    </div>

    <!-- Pricing section -->
    <div class="flow-root pb-24 sm:pb-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="relative">
          <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <!-- Basic Plan -->
            <div class="ring-1 ring-gray-200 rounded-3xl p-8 xl:p-10">
              <div class="flex items-center justify-between gap-x-4">
                <h2 class="text-lg font-semibold leading-8 text-gray-900">Basique</h2>
                <p class="rounded-full bg-gray-50 px-2.5 py-1 text-xs font-semibold leading-5 text-gray-600">
                  Les plus populaires
                </p>
              </div>
              <p class="mt-4 text-sm leading-6 text-gray-600">Parfait pour les petites équipe débutant dnas la gestion IT.</p>
              <p class="mt-6 flex items-baseline gap-x-1">
                <span class="text-4xl font-bold tracking-tight text-gray-900">$29</span>
                <span class="text-sm font-semibold leading-6 text-gray-600">/mois</span>
              </p>
              <ul role="list" class="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                <li class="flex gap-x-3">
                  <CheckIcon class="h-6 w-5 flex-none text-blue-600" />
                  Jusqu'a 50 actifs
                </li>
                <li class="flex gap-x-3">
                  <CheckIcon class="h-6 w-5 flex-none text-blue-600" />
                  Rapports de bases
                </li>
                <li class="flex gap-x-3">
                  <CheckIcon class="h-6 w-5 flex-none text-blue-600" />
                  Support par Email
                </li>
              </ul>
              <router-link to="/signup" class="mt-8 block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                Choisir le plan
              </router-link>
            </div>

            <!-- Professional Plan -->
            <div class="bg-gray-900 ring-1 ring-gray-900 rounded-3xl p-8 xl:p-10">
              <div class="flex items-center justify-between gap-x-4">
                <h2 class="text-lg font-semibold leading-8 text-white">Professionel</h2>
                <p class="rounded-full bg-blue-500 px-2.5 py-1 text-xs font-semibold leading-5 text-white">
                  Meilleure Valeur
                </p>
              </div>
              <p class="mt-4 text-sm leading-6 text-gray-300">Idéal pour les compagnies grandissants aux besoins avancés.</p>
              <p class="mt-6 flex items-baseline gap-x-1">
                <span class="text-4xl font-bold tracking-tight text-white">$79</span>
                <span class="text-sm font-semibold leading-6 text-gray-300">/mois</span>
              </p>
              <ul role="list" class="mt-8 space-y-3 text-sm leading-6 text-gray-300">
                <li class="flex gap-x-3">
                  <CheckIcon class="h-6 w-5 flex-none text-blue-400" />
                  Jusqu'a 200 actifs
                </li>
                <li class="flex gap-x-3">
                  <CheckIcon class="h-6 w-5 flex-none text-blue-400" />
                  Analyses avancées
                </li>
                <li class="flex gap-x-3">
                  <CheckIcon class="h-6 w-5 flex-none text-blue-400" />
                  Support prioritaire
                </li>
                <li class="flex gap-x-3">
                  <CheckIcon class="h-6 w-5 flex-none text-blue-400" />
                  Rapport personalisable
                </li>
              </ul>
              <router-link to="/signup" class="mt-8 block rounded-md bg-white px-3 py-2 text-center text-sm font-semibold leading-6 text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                Choisir le plan
              </router-link>
            </div>

            <!-- Enterprise Plan -->
            <div class="ring-1 ring-gray-200 rounded-3xl p-8 xl:p-10">
              <div class="flex items-center justify-between gap-x-4">
                <h2 class="text-lg font-semibold leading-8 text-gray-900">Enterprise</h2>
              </div>
              <p class="mt-4 text-sm leading-6 text-gray-600">Une solution personalisé pour les grandes entreprises.</p>
              <p class="mt-6 flex items-baseline gap-x-1">
                <span class="text-4xl font-bold tracking-tight text-gray-900">Personalisé</span>
              </p>
              <ul role="list" class="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                <li class="flex gap-x-3">
                  <CheckIcon class="h-6 w-5 flex-none text-blue-600" />
                  Actifs illimités
                </li>
                <li class="flex gap-x-3">
                  <CheckIcon class="h-6 w-5 flex-none text-blue-600" />
                  Intégration personalisé
                </li>
                <li class="flex gap-x-3">
                  <CheckIcon class="h-6 w-5 flex-none text-blue-600" />
                  Support dédié 24h/24
                </li>
                <li class="flex gap-x-3">
                  <CheckIcon class="h-6 w-5 flex-none text-blue-600" />
                  Déploiement sur site
                </li>
              </ul>
              <router-link to="/contact" class="mt-8 block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                Créer votre Plan
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- FAQ section -->
    <div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
      <div class="mx-auto max-w-4xl divide-y divide-gray-900/10">
        <h2 class="text-2xl font-bold leading-10 tracking-tight text-gray-900">Questions fréquentes</h2>
        <dl class="mt-10 space-y-6 divide-y divide-gray-900/10">
          <div v-for="faq in faqs" :key="faq.question" class="pt-6">
            <dt>
              <button class="flex w-full items-start justify-between text-left text-gray-900">
                <span class="text-base font-semibold leading-7">{{ faq.question }}</span>
              </button>
            </dt>
            <dd class="mt-2 pr-12">
              <p class="text-base leading-7 text-gray-600">{{ faq.answer }}</p>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CheckIcon } from '@heroicons/vue/24/outline';
import Navigation from '../components/Navigation.vue';

const faqs = [
  {
    question: "Qu'est ce qui est inclue dans le plan de base?",
    answer: "Notre plan de base inclu les éléments essentiel pour les petites équipes, tel qu'un suivi des actifs pour un maximum de 50 actifs, la création de rapports de base, et un support par email lors des heures d'ouverture."
  },
  {
    question: "Est il possible de modifier mon plan après l'achat?",
    answer: "Oui, vous pouvez modifier votre plan à tout moment. Lors d'ajout de fonctionnalités, vous aurez un accès immédiat à ces dernières. Lorsque vous retirer une fonctionnalité, vous y perdrez l'accès lors du prochain cycle de facturation."
  },
  {
    question: "Offrez vous un plan personalisable?",
    answer: "Oui, vous pouvez créer le plan qui vous convient selon vos besoins."
  },
  {
    question: "Quel genre de support offrez-vous?",
    answer: "Nous offrons des méthodes de support différent selon votre plan. Le plan de base vous donne accès à un support par email, et le plan professionel inclu un support prioritaire dédié 24h/24."
  }
];
</script>
