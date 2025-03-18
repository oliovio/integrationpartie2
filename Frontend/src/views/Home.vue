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
<<<<<<< HEAD
                <span class="block">Gérer vos équipements IT</span>
                <span class="block text-blue-600">avec confiance</span>
              </h1>
              <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Organiser les actifs IT de votre organisation grâce à nos suivis compréhensifs et notre gestionnaire de maintenance.
              </p>
              <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div class="rounded-md shadow">
                  <router-link to="/get-started" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
                    Débuter
                  </router-link>
                </div>
                <div class="mt-3 sm:mt-0 sm:ml-3">
                  <router-link to="/learn-more" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10">
                    En savoir plus →
                  </router-link>
                </div>
              </div>
=======
                <span class="block">Manage your IT</span>
                <span class="block text-blue-600">with confidence</span>
              </h1>
              <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Simplify your organization's IT asset management with our tracking and maintenance solution.
              </p>
>>>>>>> bec3898fc2873873aac2b332ba9c857d87a794a4
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
<<<<<<< HEAD
          <h2 class="text-base font-semibold leading-7 text-blue-600">Une solution compréhensive</h2>
          <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Tout ce qu'il vous faut pour Gérer vos équipements IT</p>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            Notre plateforme vous offre tous les outils d'ont vous avez besoin pour suivre et optimiser la gestion de vous équipements IT.
=======
          <h2 class="text-base font-semibold leading-7 text-blue-600">Comprehensive Solution</h2>
          <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Everything you need to manage your IT assets</p>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            Our platform provides all the necessary tools to track, maintain, and optimize your IT equipment.
>>>>>>> bec3898fc2873873aac2b332ba9c857d87a794a4
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
<<<<<<< HEAD
            Faites l'expérience du gestionnaire avancée et du support dédié 24h/24 de note plan professionel.
=======
            Enjoy high-end IT equipment management with our advanced features and dedicated support.
>>>>>>> bec3898fc2873873aac2b332ba9c857d87a794a4
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
<<<<<<< HEAD
    title: 'Gestion de la Maintenance',
    description: 'Planifiez et surveillez la maintenance de vos équipements',
    icon: WrenchScrewdriverIcon,
  },
  {
    title: 'Analytiques & Rapports',
    description: 'Soyez informé grâce à nos analyses et rapports détaillés',
=======
    title: 'Maintenance Management',
    description: 'Schedule and monitor your equipment maintenance',
    icon: WrenchScrewdriverIcon,
  },
  {
    title: 'Analytics & Reports',
    description: 'Gain insights with detailed analytics and reports',
>>>>>>> bec3898fc2873873aac2b332ba9c857d87a794a4
    icon: ChartBarIcon,
  },
];

const services = [
  {
<<<<<<< HEAD
    name: 'Surveillance en temps réel',
    description: 'Surveillez le statut et la performance de vos équipements en temps réel',
    icon: ClockIcon,
  },
  {
    name: 'Stockage sur le cloud',
    description: 'Stockage sur un Cloud sécurisé de toutes les données et documents relatives à vos équipements',
=======
    name: 'Real-time Monitoring',
    description: 'Monitor your IT equipment’s performance and status in real time',
    icon: ClockIcon,
  },
  {
    name: 'Cloud Storage',
    description: 'Secure storage for all your data and documents',
>>>>>>> bec3898fc2873873aac2b332ba9c857d87a794a4
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Sécurité Avancée',
    description: 'Sécurité de haute qualité pour protéger vos données sensibles',
    icon: LockClosedIcon,
  },
  {
<<<<<<< HEAD
    name: 'Gestion du serveur',
    description: 'Surveillez de près le serveur et les outils de gestions',
    icon: ServerIcon,
  },
  {
    name: 'Support 24h/24 et 7 jours/semaine',
    description: 'Round-the-clock technical support from our expert team',
    icon: ChatBubbleLeftRightIcon,
  },
];

const plans = [
  {
    name: 'Plan de base',
    price: 29,
    period: '/month',
    description: 'Parfait pour les petites équipes',
    features: [
      'Jusqu\'a 50 actifs',
      'Analyses de base',
      'Support par Email',
      'Accès par application mobile',
      '5GB de stockage',
    ],
  },
  {
    name: 'Professionel',
    price: 79,
    period: '/month',
    description: 'Pour les compagnies grandissantes',
    features: [
      'Jusqu\'a 200 actifs',
      'Analyses avancées',
      'Support prioritaire',
      'Accès par application mobile',
      '25GB de stockage',
      'aAccès aux API',
      'Rapports personalisables',
    ],
    popular: true,
  },
  {
    name: 'Créer votre propre plan',
    price: "",
    period: '',
    description: 'Créer un plan personalisé qui convient à vos besoins',
    features: [
      '',
    ],
  },
];
</script>
=======
    name: 'Server Management',
    description: 'Comprehensive tools for server monitoring and management',
    icon: ServerIcon,
  },
  {
    name: '24/7 Support',
    description: 'Technical support available anytime',
    icon: ChatBubbleLeftRightIcon,
  },
];
</script>
>>>>>>> bec3898fc2873873aac2b332ba9c857d87a794a4
