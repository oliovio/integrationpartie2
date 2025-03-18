<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <!-- Navigation -->
    <Navigation />

    <!-- Hero Section -->
    <div class="relative overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <div class="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div class="sm:text-center lg:text-left">
              <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span class="block">Gérer vos équipements IT</span>
                <span class="block text-blue-600">avec confiance</span>
              </h1>
              <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Simplifiez la gestion de vos actifs grâce à notre système de suivi des maintenances.
              </p>
            </div>
          </main>
        </div>
      </div>
      <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img class="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80" alt="">
      </div>
    </div>

    <!-- Features Section -->
    <div class="py-24 bg-white sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-base font-semibold leading-7 text-blue-600">Une solution compréhensive</h2>
          <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Tout ce qu'il vous faut pour Gérer vos équipements IT</p>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            Notre plateforme vous offre tous les outils d'ont vous avez besoin pour suivre et optimiser la gestion de vous équipements IT.
          </p>
        </div>

        <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div v-for="feature in features" :key="feature.title" class="flex flex-col">
              <dt class="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <component :is="feature.icon" class="h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
                {{ feature.title }}
              </dt>
              <dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p class="flex-auto">{{ feature.description }}</p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>

    <!-- Services Section -->
    <div class="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">Services Premium</h2>
          <p class="mt-6 text-lg leading-8 text-gray-300">
            Faites l'expérience du gestionnaire avancée et du support dédié 24h/24 de note plan professionel.
          </p>
        </div>
      </div>
    </div>

    <!-- Reviews Section -->
    <Reviews />

    <!-- Contact Form -->
    <ContactForm />

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { 
  ComputerDesktopIcon, 
  ChartBarIcon, 
  WrenchScrewdriverIcon,
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/vue/24/outline';
import Navigation from '../components/Navigation.vue';
import ContactForm from '../components/ContactForm.vue';
import Reviews from '../components/Reviews.vue';
import Footer from '../components/Footer.vue';

const features = [
  {
    title: 'Suivi des Équipements',
    description: 'Suivez et gérez vos équipements IT en un seul endroit',
    icon: ComputerDesktopIcon,
  },
  {
    title: 'Gestion de la Maintenance',
    description: 'Planifiez et surveillez la maintenance de vos équipements',
    icon: WrenchScrewdriverIcon,
  },
  {
    title: 'Analytiques & Rapports',
    description: 'Soyez informé grâce à nos analyses et rapports détaillés',
    icon: ChartBarIcon,
  },
];

const services = [
  {
    name: 'Surveillance en temps réel',
    description: 'Surveillez le statut et la performance de vos équipements en temps réel',
    icon: ClockIcon,
  },
  {
    name: 'Stockage sur le cloud',
    description: 'Stockage sur un Cloud sécurisé de toutes les données et documents relatives à vos équipements',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Sécurité Avancée',
    description: 'Sécurité de haute qualité pour protéger vos données sensibles',
    icon: LockClosedIcon,
  },
  {
    name: 'Gestion de serveur',
    description: 'Un outil compréhensif pour la surveillance te la gestion',
    icon: ServerIcon,
  },
  {
    name: 'Support 24h/24',
    description: 'Support technique offert en tout temps',
    icon: ChatBubbleLeftRightIcon,
  },
];
</script>
