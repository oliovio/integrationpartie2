<script setup>
import { ref, computed } from 'vue';
import { useEquipmentStore } from '../stores/equipment';
import { RouterLink } from 'vue-router';
import { PlusIcon, PencilSquareIcon, TrashIcon, EyeIcon } from '@heroicons/vue/24/outline';

const equipmentStore = useEquipmentStore();
const searchQuery = ref('');
const showAddModal = ref(false);
const showEditModal = ref(false);
const showDetailsModal = ref(false);
const selectedEquipment = ref(null);

const newEquipment = ref({
  type: '',
  model: '',
  serialNumber: '',
  status: 'Available',
  assignedTo: ''
});

const filteredEquipment = computed(() => {
  return equipmentStore.equipment.filter(item => 
    item.type.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    item.model.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    item.assignedTo.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const addEquipment = () => {
  equipmentStore.addEquipment({
    id: Date.now(),
    ...newEquipment.value
  });
  showAddModal.value = false;
  newEquipment.value = {
    type: '',
    model: '',
    serialNumber: '',
    status: 'Available',
    assignedTo: ''
  };
};

const editEquipment = () => {
  const index = equipmentStore.equipment.findIndex(e => e.id === selectedEquipment.value.id);
  if (index !== -1) {
    equipmentStore.updateEquipment(selectedEquipment.value);
  }
  showEditModal.value = false;
};

const deleteEquipment = (equipment) => {
  if (confirm('Are you sure you want to delete this equipment?')) {
    equipmentStore.deleteEquipment(equipment.id);
  }
};

const openEditModal = (equipment) => {
  selectedEquipment.value = { ...equipment };
  showEditModal.value = true;
};

const openDetailsModal = (equipment) => {
  selectedEquipment.value = equipment;
  showDetailsModal.value = true;
};
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Equipment List</h1>
      <button
        @click="showAddModal = true"
        class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <PlusIcon class="h-5 w-5 mr-2" />
        Add New Equipment
      </button>
    </div>

    <div class="mb-6">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search equipment..."
        class="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div class="bg-white rounded-lg shadow overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serial Number</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="item in filteredEquipment" :key="item.id">
            <td class="px-6 py-4 whitespace-nowrap">{{ item.type }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.model }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.serialNumber }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                :class="{
                  'px-2 py-1 text-xs font-medium rounded-full': true,
                  'bg-green-100 text-green-800': item.status === 'Available',
                  'bg-yellow-100 text-yellow-800': item.status === 'In Use',
                  'bg-red-100 text-red-800': item.status === 'Maintenance'
                }"
              >
                {{ item.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.assignedTo }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm space-x-2">
              <button 
                @click="openDetailsModal(item)" 
                class="text-blue-600 hover:text-blue-900"
                title="View Details"
              >
                <EyeIcon class="h-5 w-5" />
              </button>
              <button 
                @click="openEditModal(item)" 
                class="text-yellow-600 hover:text-yellow-900"
                title="Edit"
              >
                <PencilSquareIcon class="h-5 w-5" />
              </button>
              <button 
                @click="deleteEquipment(item)" 
                class="text-red-600 hover:text-red-900"
                title="Delete"
              >
                <TrashIcon class="h-5 w-5" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add Equipment Modal -->
    <div v-if="showAddModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">Add New Equipment</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Type</label>
            <input
              v-model="newEquipment.type"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Model</label>
            <input
              v-model="newEquipment.model"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Serial Number</label>
            <input
              v-model="newEquipment.serialNumber"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Status</label>
            <select
              v-model="newEquipment.status"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option>Available</option>
              <option>In Use</option>
              <option>Maintenance</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Assigned To</label>
            <input
              v-model="newEquipment.assignedTo"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
        <div class="mt-6 flex justify-end space-x-3">
          <button
            @click="showAddModal = false"
            class="px-4 py-2 border rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            @click="addEquipment"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Equipment
          </button>
        </div>
      </div>
    </div>

    <!-- Edit Equipment Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">Edit Equipment</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Type</label>
            <input
              v-model="selectedEquipment.type"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Model</label>
            <input
              v-model="selectedEquipment.model"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Serial Number</label>
            <input
              v-model="selectedEquipment.serialNumber"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Status</label>
            <select
              v-model="selectedEquipment.status"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option>Available</option>
              <option>In Use</option>
              <option>Maintenance</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Assigned To</label>
            <input
              v-model="selectedEquipment.assignedTo"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
        <div class="mt-6 flex justify-end space-x-3">
          <button
            @click="showEditModal = false"
            class="px-4 py-2 border rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            @click="editEquipment"
            class="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>

    <!-- Details Modal -->
    <div v-if="showDetailsModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">Equipment Details</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Type</label>
            <p class="mt-1 text-gray-900">{{ selectedEquipment.type }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Model</label>
            <p class="mt-1 text-gray-900">{{ selectedEquipment.model }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Serial Number</label>
            <p class="mt-1 text-gray-900">{{ selectedEquipment.serialNumber }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Status</label>
            <p class="mt-1">
              <span
                :class="{
                  'px-2 py-1 text-xs font-medium rounded-full': true,
                  'bg-green-100 text-green-800': selectedEquipment.status === 'Available',
                  'bg-yellow-100 text-yellow-800': selectedEquipment.status === 'In Use',
                  'bg-red-100 text-red-800': selectedEquipment.status === 'Maintenance'
                }"
              >
                {{ selectedEquipment.status }}
              </span>
            </p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Assigned To</label>
            <p class="mt-1 text-gray-900">{{ selectedEquipment.assignedTo }}</p>
          </div>
        </div>
        <div class="mt-6 flex justify-end">
          <button
            @click="showDetailsModal = false"
            class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>