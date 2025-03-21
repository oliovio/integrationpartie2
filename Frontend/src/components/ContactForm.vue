<script setup>
import { ref } from 'vue';

const form = ref({
  name: '',
  email: '',
  message: '',
});

const notification = ref({
  show: false,
  message: '',
  type: 'succès'
});

const isSubmitting = ref(false);
const errors = ref({
  name: '',
  email: '',
  message: '',
});

const showNotification = (message, type = 'succès') => {
  notification.value = {
    show: true,
    message,
    type
  };
  setTimeout(() => {
    notification.value.show = false;
  }, 3000);
};

// Client-side validation function
const validateForm = () => {
  errors.value = { name: '', email: '', message: '' };
  let valid = true;

  if (!form.value.name.trim()) {
    errors.value.name = "Un nom est requis.";
    valid = false;
  } else if (form.value.name.length < 2) {
    errors.value.name = "Votre nom doit contenir au moin 2 caractères.";
    valid = false;
  }

  if (!form.value.email.trim()) {
    errors.value.email = "Une addresse email est requise.";
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = "Addresse email invalide.";
    valid = false;
  }

  if (!form.value.message.trim()) {
    errors.value.message = "Un message est requis.";
    valid = false;
  } else if (form.value.message.length < 10) {
    errors.value.message = "Le message doit contenir au moin 10 caractères.";
    valid = false;
  }

  return valid;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  isSubmitting.value = true;
  try {
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    showNotification('Message envoyé avec succès!');
    form.value = { name: '', email: '', message: '' };
  } catch (error) {
    showNotification('Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.', 'error');
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="bg-white py-16 sm:py-24">
    <div class="relative sm:py-16">
      <div class="mx-auto max-w-md px-6 sm:max-w-3xl lg:max-w-7xl lg:px-8">
        <div class="relative overflow-hidden rounded-2xl bg-blue-600 px-6 py-10 shadow-xl sm:px-12 sm:py-20">
          <div class="relative">
            <div class="sm:text-center">
              <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Contactez nous
              </h2>
              <p class="mx-auto mt-6 max-w-2xl text-lg text-blue-100">
                Vous avez des question par rapport à nos services? Envoyez la nous et nous vouz réponderonts sous peu!
              </p>
            </div>
            
            <!-- Notification -->
            <div 
              v-if="notification.show"
              :class="[
                'fixed top-4 right-4 p-4 rounded-md shadow-lg transition-all duration-500 z-50',
                notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
              ]"
            >
              <p class="text-white">{{ notification.message }}</p>
            </div>

            <form @submit.prevent="handleSubmit" class="mt-12 sm:mx-auto sm:max-w-lg">
              <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                <div>
                  <label for="name" class="block text-sm font-medium text-blue-100">Nom</label>
                  <div class="mt-1">
                    <input 
                      v-model="form.name"
                      type="text" 
                      name="name" 
                      id="name"
                      class="block w-full rounded-md border-blue-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
                    >
                    <p v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name }}</p>
                  </div>
                </div>
                <div>
                  <label for="email" class="block text-sm font-medium text-blue-100">Email</label>
                  <div class="mt-1">
                    <input 
                      v-model="form.email"
                      type="email" 
                      name="email" 
                      id="email"
                      class="block w-full rounded-md border-blue-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
                    >
                    <p v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</p>
                  </div>
                </div>
                <div class="sm:col-span-2">
                  <label for="message" class="block text-sm font-medium text-blue-100">Message</label>
                  <div class="mt-1">
                    <textarea 
                      v-model="form.message"
                      id="message" 
                      name="message" 
                      rows="4"
                      class="block w-full rounded-md border-blue-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
                    ></textarea>
                    <p v-if="errors.message" class="text-red-500 text-xs mt-1">{{ errors.message }}</p>
                  </div>
                </div>
                <div class="sm:col-span-2">
                  <button 
                    type="submit"
                    :disabled="isSubmitting"
                    class="w-full rounded-md border border-transparent bg-white py-3 px-6 text-base font-medium text-blue-600 shadow-sm hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {{ isSubmitting ? 'Envoi...' : 'Message envoyé' }}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.notification-enter-active,
.notification-leave-active {
  transition: all 0.5s ease;
}
.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
