<script setup>
import { ref, computed } from 'vue';
import { useEquipmentStore } from '../stores/equipment';
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
  assignedTo: '',
  errors: {},
});

const validateNewEquipment = () => {
  newEquipment.value.errors = {};
  let isValid = true;

  if (!newEquipment.value.type.trim() || newEquipment.value.type.length < 2) {
    newEquipment.value.errors.type = "Type must be at least 2 characters.";
    isValid = false;
  }

  if (!newEquipment.value.model.trim() || newEquipment.value.model.length < 2) {
    newEquipment.value.errors.model = "Model must be at least 2 characters.";
    isValid = false;
  }

  if (!newEquipment.value.serialNumber.trim()) {
    newEquipment.value.errors.serialNumber = "Serial Number is required.";
    isValid = false;
  }

  if (!newEquipment.value.assignedTo.trim()) {
    newEquipment.value.errors.assignedTo = "Assigned To is required.";
    isValid = false;
  }

  return isValid;
};

const addEquipment = () => {
  if (!validateNewEquipment()) return;

  equipmentStore.addEquipment({
    id: Date.now(),
    type: newEquipment.value.type,
    model: newEquipment.value.model,
    serialNumber: newEquipment.value.serialNumber,
    status: newEquipment.value.status,
    assignedTo: newEquipment.value.assignedTo,
  });

  showAddModal.value = false;
  newEquipment.value = {
    type: '',
    model: '',
    serialNumber: '',
    status: 'Available',
    assignedTo: '',
    errors: {},
  };
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
<<<<<<< HEAD
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modèle</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Numéro de série</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigné à</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
=======
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Model</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Serial Number</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assigned To</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
>>>>>>> bec3898fc2873873aac2b332ba9c857d87a794a4
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="item in equipmentStore.equipment" :key="item.id">
            <td class="px-6 py-4 whitespace-nowrap">{{ item.type }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.model }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.serialNumber }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.status }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.assignedTo }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm space-x-2">
              <button class="text-blue-600 hover:text-blue-900">
                <EyeIcon class="h-5 w-5" />
              </button>
              <button class="text-yellow-600 hover:text-yellow-900">
                <PencilSquareIcon class="h-5 w-5" />
              </button>
              <button class="text-red-600 hover:text-red-900">
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
        <h2 class="text-xl font-bold mb-4">Ajouter un nouvel Équipment</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Type</label>
            <input
              v-model="newEquipment.type"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            <p v-if="newEquipment.errors.type" class="text-red-500 text-xs mt-1">{{ newEquipment.errors.type }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Modèle</label>
            <input
              v-model="newEquipment.model"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            <p v-if="newEquipment.errors.model" class="text-red-500 text-xs mt-1">{{ newEquipment.errors.model }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Numéro de série</label>
            <input
              v-model="newEquipment.serialNumber"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            <p v-if="newEquipment.errors.serialNumber" class="text-red-500 text-xs mt-1">{{ newEquipment.errors.serialNumber }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Status</label>
<<<<<<< HEAD
            <select
              v-model="newEquipment.status"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option>Disponible</option>
              <option>Utilisé</option>
=======
            <select v-model="newEquipment.status" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
              <option>Available</option>
              <option>In Use</option>
>>>>>>> bec3898fc2873873aac2b332ba9c857d87a794a4
              <option>Maintenance</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Assigné à</label>
            <input
              v-model="newEquipment.assignedTo"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            <p v-if="newEquipment.errors.assignedTo" class="text-red-500 text-xs mt-1">{{ newEquipment.errors.assignedTo }}</p>
          </div>
        </div>
        <div class="mt-6 flex justify-end space-x-3">
<<<<<<< HEAD
          <button
            @click="showAddModal = false"
            class="px-4 py-2 border rounded-md hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            @click="addEquipment"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Ajouter un Équipment
=======
          <button @click="showAddModal = false" class="px-4 py-2 border rounded-md hover:bg-gray-50">Cancel</button>
          <button @click="addEquipment" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Add Equipment
>>>>>>> bec3898fc2873873aac2b332ba9c857d87a794a4
          </button>
        </div>
      </div>
    </div>
<<<<<<< HEAD

    <!-- Edit Equipment Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">Modifier l'Équipment</h2>
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
            <label class="block text-sm font-medium text-gray-700">Modèle</label>
            <input
              v-model="selectedEquipment.model"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Numéro de série</label>
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
              <option>Disponible</option>
              <option>Utilisé</option>
              <option>Maintenance</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Assigné à</label>
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
            Annuler
          </button>
          <button
            @click="editEquipment"
            class="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
          >
            Sauvegarder les changements
          </button>
        </div>
      </div>
    </div>

    <!-- Details Modal -->
    <div v-if="showDetailsModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">Détails de l'Équipement</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Type</label>
            <p class="mt-1 text-gray-900">{{ selectedEquipment.type }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Modèle</label>
            <p class="mt-1 text-gray-900">{{ selectedEquipment.model }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Numéro de série</label>
            <p class="mt-1 text-gray-900">{{ selectedEquipment.serialNumber }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Status</label>
            <p class="mt-1">
              <span
                :class="{
                  'px-2 py-1 text-xs font-medium rounded-full': true,
                  'bg-green-100 text-green-800': selectedEquipment.status === 'Disponible',
                  'bg-yellow-100 text-yellow-800': selectedEquipment.status === 'Utilisé',
                  'bg-red-100 text-red-800': selectedEquipment.status === 'Maintenance'
                }"
              >
                {{ selectedEquipment.status }}
              </span>
            </p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Assigné à</label>
            <p class="mt-1 text-gray-900">{{ selectedEquipment.assignedTo }}</p>
          </div>
        </div>
        <div class="mt-6 flex justify-end">
          <button
            @click="showDetailsModal = false"
            class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
=======
>>>>>>> bec3898fc2873873aac2b332ba9c857d87a794a4
  </div>
</template>
