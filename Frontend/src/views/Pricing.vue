<template>
  <div class="bg-white">
    <!-- Header -->
    <div class="mx-auto max-w-7xl px-6 pt-24 pb-8 sm:pt-32 lg:px-8">
      <div class="mx-auto max-w-4xl text-center">
        <h1 class="text-base font-semibold leading-7 text-blue-600">Pricing</h1>
        <p class="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Choose the right plan for your business
        </p>
      </div>
      <p class="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
        Flexible pricing options designed to scale with your organization's needs.
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
                <h2 class="text-lg font-semibold leading-8 text-gray-900">Basic</h2>
                <p class="rounded-full bg-gray-50 px-2.5 py-1 text-xs font-semibold leading-5 text-gray-600">
                  Most popular
                </p>
              </div>
              <p class="mt-4 text-sm leading-6 text-gray-600">Perfect for small teams getting started with IT management.</p>
              <p class="mt-6 flex items-baseline gap-x-1">
                <span class="text-4xl font-bold tracking-tight text-gray-900">$29</span>
                <span class="text-sm font-semibold leading-6 text-gray-600">/month</span>
              </p>
              <ul role="list" class="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                <li class="flex gap-x-3">
                  <CheckIcon class="h-6 w-5 flex-none text-blue-600" />
                  Up to 50 assets
                </li>
                <li class="flex gap-x-3">
                  <CheckIcon class="h-6 w-5 flex-none text-blue-600" />
                  Basic reporting
                </li>
                <li class="flex gap-x-3">
                  <CheckIcon class="h-6 w-5 flex-none text-blue-600" />
                  Email support
                </li>
              </ul>
              <router-link to="/signup" class="mt-8 block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                Get started
              </router-link>
            </div>

            <!-- Professional Plan -->
            <div class="bg-gray-900 ring-1 ring-gray-900 rounded-3xl p-8 xl:p-10">
              <div class="flex items-center justify-between gap-x-4">
                <h2 class="text-lg font-semibold leading-8 text-white">Professional</h2>
                <p class="rounded-full bg-blue-500 px-2.5 py-1 text-xs font-semibold leading-5 text-white">
                  Best value
                </p>
              </div>
              <p class="mt-4 text-sm leading-6 text-gray-300">Ideal for growing organizations with advanced needs.</p>
              <p class="mt-6 flex items-baseline gap-x-1">
                <span class="text-4xl font-bold tracking-tight text-white">$79</span>
                <span class="text-sm font-semibold leading-6 text-gray-300">/month</span>
              </p>
              <ul role="list" class="mt-8 space-y-3 text-sm leading-6 text-gray-300">
                <li class="flex gap-x-3">
                  <CheckIcon class="h-6 w-5 flex-none text-blue-400" />
                  Up to 200 assets
                </li>
                <li class="flex gap-x-3">
                  <CheckIcon class="h-6 w-5 flex-none text-blue-400" />
                  Advanced analytics
                </li>
                <li class="flex gap-x-3">
                  <CheckIcon class="h-6 w-5 flex-none text-blue-400" />
                  Priority support
                </li>
                <li class="flex gap-x-3">
                  <CheckIcon class="h-6 w-5 flex-none text-blue-400" />
                  Custom reporting
                </li>
              </ul>
              <router-link to="/signup" class="mt-8 block rounded-md bg-white px-3 py-2 text-center text-sm font-semibold leading-6 text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                Get started
              </router-link>
            </div>

            <!-- Enterprise Plan -->
            <div class="ring-1 ring-gray-200 rounded-3xl p-8 xl:p-10">
              <div class="flex items-center justify-between gap-x-4">
                <h2 class="text-lg font-semibold leading-8 text-gray-900">Enterprise</h2>
              </div>
              <p class="mt-4 text-sm leading-6 text-gray-600">Custom solutions for large organizations.</p>
              <p class="mt-6 flex items-baseline gap-x-1">
                <span class="text-4xl font-bold tracking-tight text-gray-900">Custom</span>
              </p>
              <ul role="list" class="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                <li class="flex gap-x-3">
                  <CheckIcon class="h-6 w-5 flex-none text-blue-600" />
                  Unlimited assets
                </li>
                <li class="flex gap-x-3">
                  <CheckIcon class="h-6 w-5 flex-none text-blue-600" />
                  Custom integrations
                </li>
                <li class="flex gap-x-3">
                  <CheckIcon class="h-6 w-5 flex-none text-blue-600" />
                  24/7 dedicated support
                </li>
                <li class="flex gap-x-3">
                  <CheckIcon class="h-6 w-5 flex-none text-blue-600" />
                  On-premise deployment
                </li>
              </ul>
              <router-link to="/contact" class="mt-8 block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                Contact sales
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- FAQ section -->
    <div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
      <div class="mx-auto max-w-4xl divide-y divide-gray-900/10">
        <h2 class="text-2xl font-bold leading-10 tracking-tight text-gray-900">Frequently asked questions</h2>
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

const faqs = [
  {
    question: "What's included in the Basic plan?",
    answer: "The Basic plan includes essential features for small teams, including asset tracking for up to 50 devices, basic reporting capabilities, and email support during business hours."
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer: "Yes, you can change your plan at any time. When upgrading, you'll have immediate access to new features. When downgrading, changes will take effect at the start of your next billing cycle."
  },
  {
    question: "Do you offer custom solutions?",
    answer: "Yes, our Enterprise plan offers fully customizable solutions tailored to your organization's specific needs, including custom integrations and on-premise deployment options."
  },
  {
    question: "What kind of support do you provide?",
    answer: "We offer different levels of support based on your plan. Basic includes email support, Professional includes priority support with faster response times, and Enterprise includes 24/7 dedicated support."
  }
];
</script>
