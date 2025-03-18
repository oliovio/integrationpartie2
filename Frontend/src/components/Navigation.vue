<template>
  <!-- Navigation -->
  <nav class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <img class="h-8 w-8 text-blue-600" viewBox="0 0 24 24" fill="none" src="../assets/logo.png">
            <span class="ml-2 text-xl font-bold text-gray-900">CortexIT</span>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <router-link to="/" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
              Acceuil
            </router-link>
            <router-link to="/services" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
              Nos Services
            </router-link>
            <router-link to="/pricing" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
              Prix
            </router-link>
            <router-link to="/contact" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
              Contactez nous
            </router-link>
          </div>
        </div>
        <div class="flex items-center">
          <router-link to="/login" class="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium">
            Se connecter
          </router-link>
          <router-link to="/signup" class="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            S'inscrire
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>
