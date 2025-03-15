<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ComputerDesktopIcon } from '@heroicons/vue/24/outline';

const router = useRouter();

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  errors: {}
});

const isSubmitting = ref(false);

const validateForm = () => {
  form.value.errors = {};
  let isValid = true;

  if (!form.value.name.trim()) {
    form.value.errors.name = "Full name is required.";
    isValid = false;
  } else if (form.value.name.length < 2) {
    form.value.errors.name = "Full name must be at least 2 characters.";
    isValid = false;
  }

  if (!form.value.email.trim()) {
    form.value.errors.email = "Email is required.";
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    form.value.errors.email = "Invalid email format.";
    isValid = false;
  }

  if (!form.value.password.trim()) {
    form.value.errors.password = "Password is required.";
    isValid = false;
  } else if (form.value.password.length < 6) {
    form.value.errors.password = "Password must be at least 6 characters.";
    isValid = false;
  }

  if (!form.value.confirmPassword.trim()) {
    form.value.errors.confirmPassword = "Please confirm your password.";
    isValid = false;
  } else if (form.value.password !== form.value.confirmPassword) {
    form.value.errors.confirmPassword = "Passwords do not match.";
    isValid = false;
  }

  return isValid;
};

const handleSignup = async () => {
  if (!validateForm()) return;

  isSubmitting.value = true;

  try {
    // Simulate API call (Replace with actual signup logic)
    await new Promise(resolve => setTimeout(resolve, 1500));

    alert("Signup successful!");

    // Redirect to another page after successful signup
    router.push('/dashboard');
  } catch (error) {
    alert("Signup failed. Please try again.");
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="flex justify-center">
        <ComputerDesktopIcon class="h-12 w-12 text-blue-600" />
      </div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Create your account
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Or
        <RouterLink to="/login" class="font-medium text-blue-600 hover:text-blue-500">
          sign in to your existing account
        </RouterLink>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="handleSignup">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Full name</label>
            <div class="mt-1">
              <input
                id="name"
                v-model="form.name"
                type="text"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                :class="{ 'border-red-500 ring-red-500': form.errors.name }"
              />
              <p v-if="form.errors.name" class="text-red-500 text-xs mt-1">{{ form.errors.name }}</p>
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
            <div class="mt-1">
              <input
                id="email"
                v-model="form.email"
                type="email"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                :class="{ 'border-red-500 ring-red-500': form.errors.email }"
              />
              <p v-if="form.errors.email" class="text-red-500 text-xs mt-1">{{ form.errors.email }}</p>
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <div class="mt-1">
              <input
                id="password"
                v-model="form.password"
                type="password"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                :class="{ 'border-red-500 ring-red-500': form.errors.password }"
              />
              <p v-if="form.errors.password" class="text-red-500 text-xs mt-1">{{ form.errors.password }}</p>
            </div>
          </div>

          <div>
            <label for="confirm-password" class="block text-sm font-medium text-gray-700">Confirm password</label>
            <div class="mt-1">
              <input
                id="confirm-password"
                v-model="form.confirmPassword"
                type="password"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                :class="{ 'border-red-500 ring-red-500': form.errors.confirmPassword }"
              />
              <p v-if="form.errors.confirmPassword" class="text-red-500 text-xs mt-1">{{ form.errors.confirmPassword }}</p>
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {{ isSubmitting ? 'Signing up...' : 'Create account' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
