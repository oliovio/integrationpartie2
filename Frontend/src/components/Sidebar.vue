<template>
  <aside class="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 z-30">
    <div class="flex flex-col h-full">
      <!-- Logo -->
      <div class="flex items-center px-6 py-4 border-b border-gray-200">
        <router-link to="/" class="flex items-center space-x-2">
          <ComputerDesktopIcon class="h-8 w-8 text-blue-600" />
          <span class="text-xl font-semibold text-gray-900">IT Manager</span>
        </router-link>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        <router-link
          v-for="item in navigation"
          :key="item.name"
          :to="item.href"
          :class="[
            isActive(item.href)
              ? 'bg-blue-50 text-blue-600'
              : 'text-gray-600 hover:bg-gray-50',
            'group flex items-center px-3 py-2 text-sm font-medium rounded-lg'
          ]"
        >
          <component
            :is="item.icon"
            :class="[
              isActive(item.href) ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500',
              'mr-3 h-5 w-5 flex-shrink-0'
            ]"
            aria-hidden="true"
          />
          {{ item.name }}
        </router-link>
      </nav>

      <!-- User Profile -->
      <div class="px-4 py-4 border-t border-gray-200">
        <div class="flex items-center space-x-3">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="User avatar"
            class="h-8 w-8 rounded-full"
          />
          <div>
            <p class="text-sm font-medium text-gray-700">John Doe</p>
            <p class="text-xs text-gray-500">IT Admin</p>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import {
  HomeIcon,
  ComputerDesktopIcon,
  WrenchScrewdriverIcon,
  ChartBarIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
} from '@heroicons/vue/24/outline';

const route = useRoute();

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Equipment', href: '/equipment', icon: ComputerDesktopIcon },
  { name: 'Maintenance', href: '/maintenance', icon: WrenchScrewdriverIcon },
  { name: 'Reports', href: '/reports', icon: ChartBarIcon },
  { name: 'Departments', href: '/departments', icon: BuildingOfficeIcon },
];

const isActive = (path) => {
  return route.path === path;
};
</script>