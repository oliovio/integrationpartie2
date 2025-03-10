<template>
  <div class="bg-white">
    <!-- Hero section -->
    <div class="relative isolate overflow-hidden bg-gradient-to-b from-blue-100/20">
      <div class="mx-auto max-w-7xl px-6 pt-10 pb-24 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
          <h1 class="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Our Services
          </h1>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            Comprehensive IT equipment management solutions tailored to your organization's needs.
          </p>
        </div>
      </div>
    </div>

    <!-- Services grid -->
    <div class="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
      <div class="mx-auto max-w-2xl lg:max-w-none">
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div v-for="service in services" :key="service.name" class="relative isolate flex flex-col justify-between rounded-2xl bg-white shadow-xl ring-1 ring-gray-200 p-8">
            <div>
              <div class="flex items-center gap-x-4">
                <component :is="service.icon" class="h-8 w-8 flex-none text-blue-600" />
                <h3 class="text-lg font-semibold leading-8 text-gray-900">{{ service.name }}</h3>
              </div>
              <p class="mt-4 text-sm leading-6 text-gray-600">{{ service.description }}</p>
              <ul class="mt-6 space-y-4 text-sm leading-6 text-gray-600">
                <li v-for="feature in service.features" :key="feature" class="flex gap-x-3">
                  <CheckIcon class="h-6 w-5 flex-none text-blue-600" />
                  {{ feature }}
                </li>
              </ul>
            </div>
            <a :href="service.href" class="mt-8 text-sm font-semibold leading-6 text-blue-600 hover:text-blue-500">
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA section -->
    <div class="relative isolate mt-32 px-6 py-32 sm:mt-56 sm:py-40 lg:px-8">
      <div class="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl">
        <div class="ml-[max(50%,38rem)] aspect-[1313/771] w-[82.0625rem] bg-gradient-to-tr from-blue-600 to-blue-400"></div>
      </div>
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Ready to streamline your IT management?
        </h2>
        <p class="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
          Start managing your IT equipment more efficiently today with our comprehensive solution.
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <router-link to="/pricing" class="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
            View pricing
          </router-link>
          <router-link to="/contact" class="text-sm font-semibold leading-6 text-gray-900">
            Contact sales <span aria-hidden="true">→</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CheckIcon } from '@heroicons/vue/24/outline';

const services = [
  {
    name: 'Asset Tracking',
    description: 'Comprehensive tracking of all IT equipment across your organization.',
    icon: CheckIcon,
    href: '#',
    features: [
      'Real-time asset location tracking',
      'Detailed equipment history',
      'Automated inventory updates',
      'Custom reporting tools'
    ]
  },
  {
    name: 'Maintenance Management',
    description: 'Proactive maintenance scheduling and tracking system.',
    icon: CheckIcon,
    href: '#',
    features: [
      'Preventive maintenance scheduling',
      'Service history tracking',
      'Vendor management',
      'Maintenance cost analysis'
    ]
  },
  {
    name: 'Analytics & Reporting',
    description: 'Advanced analytics and customizable reporting solutions.',
    icon: CheckIcon,
    href: '#',
    features: [
      'Custom report generation',
      'Performance analytics',
      'Cost optimization insights',
      'Trend analysis'
    ]
  }
];
</script>
