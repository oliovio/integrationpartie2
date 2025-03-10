<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useEquipmentStore } from '../stores/equipment';
import { format } from 'date-fns';

const route = useRoute();
const router = useRouter();
const equipmentStore = useEquipmentStore();
const equipment = ref(null);

onMounted(() => {
  const id = parseInt(route.params.id);
  equipment.value = equipmentStore.getEquipmentById(id);
  
  if (!equipment.value) {
    router.push('/equipment');
  }
});
</script>

<template>
  <div v-if="equipment" class="p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">Equipment Details</h1>
      <button
        @click="$router.push('/equipment')"
        class="text-gray-600 hover:text-gray-900"
      >
        Back to List
      </button>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="grid grid-cols-2 gap-6">
        <div>
          <h3 class="text-gray-500 text-sm">Type</h3>
          <p class="text-lg font-medium">{{ equipment.type }}</p>
        </div>
        <div>
          <h3 class="text-gray-500 text-sm">Model</h3>
          <p class="text-lg font-medium">{{ equipment.model }}</p>
        </div>
        <div>
          <h3 class="text-gray-500 text-sm">Serial Number</h3>
          <p class="text-lg font-medium">{{ equipment.serialNumber }}</p>
        </div>
        <div>
          <h3 class="text-gray-500 text-sm">Status</h3>
          <p class="text-lg font-medium">
            <span :class="{
              'px-2 py-1 rounded-full text-xs font-medium': true,
              'bg-green-100 text-green-800': equipment.status === 'In Use',
              'bg-yellow-100 text-yellow-800': equipment.status === 'Maintenance',
              'bg-blue-100 text-blue-800': equipment.status === 'Available'
            }">
              {{ equipment.status }}
            </span>
          </p>
        </div>
        <div>
          <h3 class="text-gray-500 text-sm">Assigned To</h3>
          <p class="text-lg font-medium">{{ equipment.assignedTo }}</p>
        </div>
        <div>
          <h3 class="text-gray-500 text-sm">Department</h3>
          <p class="text-lg font-medium">{{ equipment.department }}</p>
        </div>
        <div>
          <h3 class="text-gray-500 text-sm">Purchase Date</h3>
          <p class="text-lg font-medium">{{ format(new Date(equipment.purchaseDate), 'PP') }}</p>
        </div>
        <div>
          <h3 class="text-gray-500 text-sm">Last Maintenance</h3>
          <p class="text-lg font-medium">{{ format(new Date(equipment.lastMaintenance), 'PP') }}</p>
        </div>
      </div>

      <div class="mt-8 flex space-x-4">
        <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Edit Equipment
        </button>
        <button class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
          Delete Equipment
        </button>
      </div>
    </div>
  </div>
</template>