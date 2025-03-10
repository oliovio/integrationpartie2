<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold text-gray-900">Equipment Maintenance Overview</h1>
    <p class="mt-2 text-gray-600">Track maintenance, costs, and lifespan of equipment.</p>

    <div class="mt-6">
      <label for="dateRange" class="block text-sm font-medium text-gray-700">Date Range</label>
      <input type="date" v-model="startDate" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
      <input type="date" v-model="endDate" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
    </div>

    <div class="mt-4">
      <label for="department" class="block text-sm font-medium text-gray-700">Department</label>
      <select v-model="selectedDepartment" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
        <option value="">All Departments</option>
        <option v-for="dept in departments" :key="dept.id" :value="dept.name">{{ dept.name }}</option>
      </select>
    </div>

    <button @click="fetchReports" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Generate Overview</button>

    <table class="min-w-full divide-y divide-gray-200 mt-6">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equipment</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Maintenance</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lifespan</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="item in equipmentData" :key="item.id">
          <td class="px-6 py-4 whitespace-nowrap">{{ item.equipment }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ item.status }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ item.lastMaintenance }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ item.cost }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ item.lifespan }} years</td>
        </tr>
      </tbody>
    </table>

    <div class="mt-6">
      <button @click="exportReport" class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Export Report</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useEquipmentStore } from '../stores/equipment';

const startDate = ref('');
const endDate = ref('');
const selectedDepartment = ref('');
const equipmentData = ref([]);
const equipmentStore = useEquipmentStore();
const departments = ref(equipmentStore.departments);

const fetchReports = () => {
  const filteredData = equipmentStore.equipment.filter(item => {
    const lastMaintenanceDate = new Date(item.lastMaintenance);
    return lastMaintenanceDate >= new Date(startDate.value) && lastMaintenanceDate <= new Date(endDate.value);
  });
  equipmentData.value = filteredData;
};

const exportReport = () => {
  // Logic for exporting the report in different formats
  alert('Export functionality is not yet implemented.');
};
</script>

<style scoped>
/* Add any specific styles for the Equipment Overview page here */
</style>