<template>
  <div class="p-6 max-w-7xl mx-auto">
    <!-- Heading and "Add New Equipment" button -->
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold text-gray-900">Rapports</h1>
      <button
        @click="openAddModal()"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        + Add New Equipment
      </button>
    </div>

    <!-- Search Bar -->
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search equipment..."
      class="w-full px-4 py-2 border rounded-lg mb-4 focus:ring-blue-500 focus:border-blue-500"
    />

    <!-- Equipment Table -->
    <div class="overflow-hidden rounded-lg shadow bg-white">
      <table class="w-full border-collapse">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-4 py-2">Type</th>
            <th class="px-4 py-2">Modèle</th>
            <th class="px-4 py-2">Numéro de série</th>
            <th class="px-4 py-2">Status</th>
            <th class="px-4 py-2">Assigné à</th>
            <th class="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in filteredEquipment" :key="item.id" class="border-t">
            <td class="px-4 py-2">{{ item.type }}</td>
            <td class="px-4 py-2">{{ item.model }}</td>
            <td class="px-4 py-2">{{ item.serialNumber }}</td>
            <td class="px-4 py-2">
              <span :class="statusClass(item.status)">{{ item.status }}</span>
            </td>
            <td class="px-4 py-2">{{ item.assignedTo }}</td>
            <td class="px-4 py-2 space-x-2">
              <!-- Edit Button -->
              <button
                class="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                @click="editEquipment(item)"
              >
                Modifier
              </button>
              <!-- Delete Button -->
              <button
                class="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                @click="deleteEquipment(item.id)"
              >
                Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add/Edit Modal -->
    <transition name="fade">
      <div
        v-if="showModal"
        class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
      >
        <div class="bg-white p-6 rounded shadow-md w-full max-w-md mx-4">
          <h2 class="text-xl font-bold mb-4">
            {{ isEditing ? 'Modifier l\'Équipment' : 'Ajouter un Équipment' }}
          </h2>
          <!-- Form Fields -->
          <div class="mb-4">
            <label class="block font-semibold mb-1">Type *</label>
            <input
              v-model="formData.type"
              type="text"
              class="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
              placeholder="e.g. Laptop, Desktop..."
            />
          </div>
          <div class="mb-4">
            <label class="block font-semibold mb-1">Modèle *</label>
            <input
              v-model="formData.model"
              type="text"
              class="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
              placeholder="e.g. ThinkPad X1 Carbon"
            />
          </div>
          <div class="mb-4">
            <label class="block font-semibold mb-1">Numéro de série *</label>
            <input
              v-model="formData.serialNumber"
              type="text"
              class="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
              placeholder="e.g. LP2023001"
            />
          </div>
          <div class="mb-4">
            <label class="block font-semibold mb-1">Status *</label>
            <select
              v-model="formData.status"
              class="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
            >
              <option value="">Choisir status</option>
              <option value="Available">Disponible</option>
              <option value="In Use">Utilisé</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block font-semibold mb-1">Assigné à</label>
            <input
              v-model="formData.assignedTo"
              type="text"
              class="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
              placeholder="e.g. John Doe"
            />
          </div>
          <!-- Validation Error Display -->
          <p class="text-red-600 mb-4" v-if="errorMessage">
            {{ errorMessage }}
          </p>
          <!-- Modal Actions -->
          <div class="flex justify-end space-x-4">
            <button
              class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              @click="closeModal"
            >
              Cancel
            </button>
            <button
              class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              @click="saveEquipment"
            >
              {{ isEditing ? 'Save Changes' : 'Add Equipment' }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Reactive state
const showModal = ref(false);
const isEditing = ref(false);
const errorMessage = ref('');

// Equipment form data
const formData = ref({
  type: '',
  model: '',
  serialNumber: '',
  status: '',
  assignedTo: ''
});

// Search functionality
const searchQuery = ref('');

// Our core equipment list
const equipmentList = ref([
  {
    id: 1,
    type: 'Laptop',
    model: 'ThinkPad X1 Carbon',
    serialNumber: 'LP2023001',
    status: 'In Use',
    assignedTo: 'John Doe'
  },
  {
    id: 2,
    type: 'Desktop',
    model: 'Dell OptiPlex 7090',
    serialNumber: 'DT2023002',
    status: 'Available',
    assignedTo: ''
  },
  {
    id: 3,
    type: 'Printer',
    model: 'HP LaserJet Pro',
    serialNumber: 'PR2023003',
    status: 'Maintenance',
    assignedTo: 'IT Support'
  },
  {
    id: 4,
    type: 'Monitor',
    model: 'Dell U2419H',
    serialNumber: 'MN2023004',
    status: 'In Use',
    assignedTo: 'Jane Smith'
  },
  {
    id: 5,
    type: 'Server',
    model: 'Dell PowerEdge R740',
    serialNumber: 'SV2023005',
    status: 'Available',
    assignedTo: ''
  }
]);

// This helps track the ID of the equipment being edited
let currentEquipmentId = null;

// Computed property for filtering
const filteredEquipment = computed(() => {
  return equipmentList.value.filter((equipment) => {
    const query = searchQuery.value.toLowerCase();
    return (
      equipment.type.toLowerCase().includes(query) ||
      equipment.model.toLowerCase().includes(query) ||
      equipment.assignedTo.toLowerCase().includes(query)
    );
  });
});

// CSS classes for status
const statusClass = (status) => {
  return {
    'px-2 py-1 text-xs font-medium rounded-full': true,
    'bg-green-100 text-green-800': status === 'Available',
    'bg-yellow-100 text-yellow-800': status === 'In Use',
    'bg-red-100 text-red-800': status === 'Maintenance'
  };
};

// Opens the modal in "Add" mode
const openAddModal = () => {
  resetForm();
  isEditing.value = false;
  currentEquipmentId = null;
  showModal.value = true;
};

// Edits existing equipment
const editEquipment = (item) => {
  // Fill form with existing equipment values
  formData.value.type = item.type;
  formData.value.model = item.model;
  formData.value.serialNumber = item.serialNumber;
  formData.value.status = item.status;
  formData.value.assignedTo = item.assignedTo;

  currentEquipmentId = item.id;
  isEditing.value = true;
  showModal.value = true;
};

// Saves or updates equipment based on current mode
const saveEquipment = () => {
  errorMessage.value = '';

  // Simple validation
  if (
    !formData.value.type ||
    !formData.value.model ||
    !formData.value.serialNumber ||
    !formData.value.status
  ) {
    errorMessage.value = 'Please fill in all required fields.';
    return;
  }

  if (isEditing.value && currentEquipmentId != null) {
    // Update existing equipment
    equipmentList.value = equipmentList.value.map((item) => {
      if (item.id === currentEquipmentId) {
        return {
          ...item,
          type: formData.value.type,
          model: formData.value.model,
          serialNumber: formData.value.serialNumber,
          status: formData.value.status,
          assignedTo: formData.value.assignedTo
        };
      }
      return item;
    });
  } else {
    // Add new equipment
    const newId = equipmentList.value.length
      ? Math.max(...equipmentList.value.map((item) => item.id)) + 1
      : 1;

    equipmentList.value.push({
      id: newId,
      type: formData.value.type,
      model: formData.value.model,
      serialNumber: formData.value.serialNumber,
      status: formData.value.status,
      assignedTo: formData.value.assignedTo
    });
  }

  closeModal();
};

// Deletes an equipment item
const deleteEquipment = (id) => {
  if (confirm('Êtes vous certains de vouloir suprimmer ce rapport?')) {
    equipmentList.value = equipmentList.value.filter((e) => e.id !== id);
  }
};

// Closes the modal
const closeModal = () => {
  showModal.value = false;
  resetForm();
};

// Resets the form
const resetForm = () => {
  formData.value.type = '';
  formData.value.model = '';
  formData.value.serialNumber = '';
  formData.value.status = '';
  formData.value.assignedTo = '';
  errorMessage.value = '';
  currentEquipmentId = null;
};
</script>

<style scoped>
/* Example fade transition (optional) */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
