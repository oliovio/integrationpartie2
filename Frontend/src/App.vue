<script setup>
import { useRoute } from 'vue-router';
import Sidebar from './components/Sidebar.vue';

const route = useRoute();
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Sidebar v-if="route.meta.showSidebar" />
    <div :class="[route.meta.showSidebar ? 'pl-64' : '']">
      <router-view />
    </div>
  </div>
</template>