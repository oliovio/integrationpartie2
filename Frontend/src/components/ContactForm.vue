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
  type: 'success'
});

const isSubmitting = ref(false);

const showNotification = (message, type = 'success') => {
  notification.value = {
    show: true,
    message,
    type
  };
  setTimeout(() => {
    notification.value.show = false;
  }, 3000);
};

const handleSubmit = async () => {
  isSubmitting.value = true;
  try {
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    showNotification('Message sent successfully!');
    form.value = { name: '', email: '', message: '' };
  } catch (error) {
    showNotification('Failed to send message. Please try again.', 'error');
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
                Get in Touch
              </h2>
              <p class="mx-auto mt-6 max-w-2xl text-lg text-blue-100">
                Have questions about our IT equipment management solution? We're here to help!
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
                  <label for="name" class="block text-sm font-medium text-blue-100">Name</label>
                  <div class="mt-1">
                    <input 
                      v-model="form.name"
                      type="text" 
                      name="name" 
                      id="name"
                      required
                      class="block w-full rounded-md border-blue-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
                    >
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
                      required
                      class="block w-full rounded-md border-blue-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
                    >
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
                      required
                      class="block w-full rounded-md border-blue-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
                    ></textarea>
                  </div>
                </div>
                <div class="sm:col-span-2">
                  <button 
                    type="submit"
                    :disabled="isSubmitting"
                    class="w-full rounded-md border border-transparent bg-white py-3 px-6 text-base font-medium text-blue-600 shadow-sm hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {{ isSubmitting ? 'Sending...' : 'Send Message' }}
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
