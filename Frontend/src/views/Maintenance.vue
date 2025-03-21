<script setup>
import { ref } from 'vue';
import { useEquipmentStore } from '../stores/equipment';
import { format } from 'date-fns';

const equipmentStore = useEquipmentStore();
const maintenanceItems = ref(equipmentStore.equipment.filter(item => item.status === 'Maintenance'));
const selectedItem = ref(null);

const completeMaintenance = () => {
  if (!selectedItem.value) {
    alert('No equipment selected for maintenance completion.');
    return;
  }
  const updatedItem = {
    ...selectedItem.value,
    status: 'Available',
    lastMaintenance: new Date().toISOString(),
  };
  equipmentStore.updateEquipment(updatedItem);
  maintenanceItems.value = equipmentStore.equipment.filter(item => item.status === 'Maintenance');
  selectedItem.value = null;
};

const formatDate = (date) => {
  if (!date) return 'Not Available';
  try {
    return format(new Date(date), 'PP');
  } catch {
    return 'Invalid Date';
  }
};
</script>

<template>
  <div class="p-8">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Horaire de Maintenance</h1>
      <p class="mt-2 text-gray-600">Gérer les équipements actuellement en maintenance</p>
    </div>

    <div class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Équipment</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Numéro de série</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="item in maintenanceItems" :key="item.id" class="hover:bg-gray-50" @click="selectedItem = item">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ item.model }}</div>
                    <div class="text-sm text-gray-500">ID: {{ item.id }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ item.type }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ item.serialNumber }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  En Maintenance
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button 
                  @click.stop="completeMaintenance"
                  class="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Compléter la Maintenance
                </button>
              </td>
            </tr>
            <tr v-if="maintenanceItems.length === 0">
              <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                Vous n'avez aucun équipement actuellement en maintenance
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>