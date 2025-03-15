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
                <span class="block">Manage your IT</span>
                <span class="block text-blue-600">with confidence</span>
              </h1>
              <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Simplify your organization's IT asset management with our tracking and maintenance solution.
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
          <h2 class="text-base font-semibold leading-7 text-blue-600">Comprehensive Solution</h2>
          <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Everything you need to manage your IT assets</p>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            Our platform provides all the necessary tools to track, maintain, and optimize your IT equipment.
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
          <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">Premium Services</h2>
          <p class="mt-6 text-lg leading-8 text-gray-300">
            Enjoy high-end IT equipment management with our advanced features and dedicated support.
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
    title: 'Equipment Tracking',
    description: 'Track and manage all your IT assets in one place',
    icon: ComputerDesktopIcon,
  },
  {
    title: 'Maintenance Management',
    description: 'Schedule and monitor your equipment maintenance',
    icon: WrenchScrewdriverIcon,
  },
  {
    title: 'Analytics & Reports',
    description: 'Gain insights with detailed analytics and reports',
    icon: ChartBarIcon,
  },
];

const services = [
  {
    name: 'Real-time Monitoring',
    description: 'Monitor your IT equipment’s performance and status in real time',
    icon: ClockIcon,
  },
  {
    name: 'Cloud Storage',
    description: 'Secure storage for all your data and documents',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Advanced Security',
    description: 'Enterprise-grade security to protect your sensitive data',
    icon: LockClosedIcon,
  },
  {
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
