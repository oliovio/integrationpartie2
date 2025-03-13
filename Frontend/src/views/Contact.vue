<template>
  <div class="bg-white">
    <!-- Navigation -->
    <Navigation />

    <!-- Header -->
    <div class="relative isolate overflow-hidden bg-gradient-to-b from-blue-100/20">
      <div class="mx-auto max-w-7xl px-6 pt-10 pb-24 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
          <h1 class="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Contactez nous
          </h1>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            Prenez contact avec notre équipe pour quelconque question concernant nos services.
          </p>
        </div>
      </div>
    </div>

    <div class="relative isolate bg-white">
      <div class="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <div class="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
          <div class="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900">Prenez contact avec nous</h2>
            <p class="mt-6 text-lg leading-8 text-gray-600">
              Vous avez des questions quant à nos services? Envoyez nous la au travers du formulaire ci dessou et nous vous réponderonts sous peu.
            </p>
          </div>
        </div>
        <form @submit.prevent="handleSubmit" class="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48">
          <div class="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
            <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div class="sm:col-span-2">
                <label for="name" class="block text-sm font-semibold leading-6 text-gray-900">Nom</label>
                <div class="mt-2.5">
                  <input
                    v-model="form.name"
                    type="text"
                    name="nom"
                    id="name"
                    autocomplete="nom"
                    class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                  <p v-if="form.errors.name" class="text-red-500 text-xs mt-1">{{ form.errors.name }}</p>
                </div>
              </div>
              <div class="sm:col-span-2">
                <label for="email" class="block text-sm font-semibold leading-6 text-gray-900">Addresse Email</label>
                <div class="mt-2.5">
                  <input
                    v-model="form.email"
                    type="email"
                    name="email"
                    id="email"
                    autocomplete="email"
                    class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                  <p v-if="form.errors.email" class="text-red-500 text-xs mt-1">{{ form.errors.email }}</p>
                </div>
              </div>
              <div class="sm:col-span-2">
                <label for="phone" class="block text-sm font-semibold leading-6 text-gray-900">Numéro de téléphone</label>
                <div class="mt-2.5">
                  <input
                    v-model="form.phone"
                    type="tel"
                    name="phone"
                    id="phone"
                    autocomplete="Telephone"
                    class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                  <p v-if="form.errors.phone" class="text-red-500 text-xs mt-1">{{ form.errors.phone }}</p>
                </div>
              </div>
              <div class="sm:col-span-2">
                <label for="message" class="block text-sm font-semibold leading-6 text-gray-900">Message</label>
                <div class="mt-2.5">
                  <textarea
                    v-model="form.message"
                    name="message"
                    id="message"
                    rows="4"
                    class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  ></textarea>
                  <p v-if="form.errors.message" class="text-red-500 text-xs mt-1">{{ form.errors.message }}</p>
                </div>
              </div>
            </div>
            <div class="mt-8 flex justify-end">
              <button
                type="submit"
                :disabled="isSubmitting"
                class="rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50"
              >
                {{ isSubmitting ? 'Sending...' : 'Send message' }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Navigation from '../components/Navigation.vue';

const form = ref({
  name: '',
  email: '',
  phone: '',
  message: '',
  errors: {
    name: null,
    email: null,
    phone: null,
    message: null,
  }
});

const isSubmitting = ref(false);

const handleSubmit = async () => {
  if (!form.value.name || form.value.name.length < 2) {
    alert('Name must be at least 2 characters long.');
    return;
  }
  if (!form.value.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    alert('Invalid email address.');
    return;
  }
  if (!form.value.phone) {
    alert('Phone number is required.');
    return;
  }
  if (!form.value.message || form.value.message.length < 10) {
    alert('Message must be at least 10 characters long.');
    return;
  }
  isSubmitting.value = true;
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Message sent successfully!');
    form.value = {
      name: '',
      email: '',
      phone: '',
      message: ''
    };
  } catch (error) {
    alert('Failed to send message. Please try again.');
  } finally {
    isSubmitting.value = false;
  }
};
</script>
