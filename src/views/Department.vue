<script setup>
import { ref } from 'vue';
import { PlusIcon, PencilSquareIcon, EyeIcon, ListBulletIcon } from '@heroicons/vue/24/outline';

const departments = ref([
  { id: 1, name: 'IT Department', description: 'Information Technology', employeeCount: 15 },
  { id: 2, name: 'HR Department', description: 'Human Resources', employeeCount: 8 },
  // Add more departments as needed
]);

const showAddModal = ref(false);
const showEditModal = ref(false);
const showDetailsModal = ref(false);
const selectedDepartment = ref(null);

const newDepartment = ref({
  name: '',
  description: '',
  employeeCount: 0
});

const addDepartment = () => {
  departments.value.push({
    id: departments.value.length + 1,
    ...newDepartment.value
  });
  showAddModal.value = false;
  newDepartment.value = { name: '', description: '', employeeCount: 0 };
};

const editDepartment = () => {
  const index = departments.value.findIndex(d => d.id === selectedDepartment.value.id);
  if (index !== -1) {
    departments.value[index] = { ...selectedDepartment.value };
  }
  showEditModal.value = false;
};

const openEditModal = (department) => {
  selectedDepartment.value = { ...department };
  showEditModal.value = true;
};

const openDetailsModal = (department) => {
  selectedDepartment.value = department;
  showDetailsModal.value = true;
};
</script>

<template>
  <div class="p-6">
    <div class="mb-6 space-y-4">
      <h1 class="text-2xl font-bold text-gray-900">Department Management</h1>
      
      <div class="flex space-x-4">
        <!-- Add Department Button -->
        <button
          @click="showAddModal = true"
          class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusIcon class="h-5 w-5 mr-2" />
          Ajouter Département
        </button>

        <!-- List Departments Button -->
        <button
          class="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <ListBulletIcon class="h-5 w-5 mr-2" />
          Liste des Départements
        </button>
      </div>
    </div>

    <!-- Departments List -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employés</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="department in departments" :key="department.id">
            <td class="px-6 py-4">{{ department.name }}</td>
            <td class="px-6 py-4">{{ department.description }}</td>
            <td class="px-6 py-4">{{ department.employeeCount }}</td>
            <td class="px-6 py-4 space-x-2">
              <button
                @click="openEditModal(department)"
                class="inline-flex items-center px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                <PencilSquareIcon class="h-4 w-4 mr-1" />
                Modifier
              </button>
              <button
                @click="openDetailsModal(department)"
                class="inline-flex items-center px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                <EyeIcon class="h-4 w-4 mr-1" />
                Détails
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add Department Modal -->
    <div v-if="showAddModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">Ajouter un Département</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Nom</label>
            <input
              v-model="newDepartment.name"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              v-model="newDepartment.description"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Nombre d'employés</label>
            <input
              v-model.number="newDepartment.employeeCount"
              type="number"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
        <div class="mt-6 flex justify-end space-x-3">
          <button
            @click="showAddModal = false"
            class="px-4 py-2 border rounded-md hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            @click="addDepartment"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>

    <!-- Edit Department Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">Modifier le Département</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Nom</label>
            <input
              v-model="selectedDepartment.name"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              v-model="selectedDepartment.description"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Nombre d'employés</label>
            <input
              v-model.number="selectedDepartment.employeeCount"
              type="number"
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
            @click="editDepartment"
            class="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
          >
            Modifier
          </button>
        </div>
      </div>
    </div>

    <!-- Details Modal -->
    <div v-if="showDetailsModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">Détails du Département</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Nom</label>
            <p class="mt-1 text-gray-900">{{ selectedDepartment.name }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Description</label>
            <p class="mt-1 text-gray-900">{{ selectedDepartment.description }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Nombre d'employés</label>
            <p class="mt-1 text-gray-900">{{ selectedDepartment.employeeCount }}</p>
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
  </div>
</template>
