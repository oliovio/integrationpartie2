<script setup>
import { ref } from 'vue';
import { PlusIcon, PencilSquareIcon, EyeIcon, ListBulletIcon } from '@heroicons/vue/24/outline';

const departments = ref([
  { id: 1, name: 'IT Department', description: 'Information Technology', employeeCount: 15 },
  { id: 2, name: 'HR Department', description: 'Human Resources', employeeCount: 8 },
]);

const showAddModal = ref(false);
const showEditModal = ref(false);
const showDetailsModal = ref(false);
const selectedDepartment = ref(null);

const newDepartment = ref({
  name: '',
  description: '',
  employeeCount: 0,
  errors: {},
});

const validateNewDepartment = () => {
  newDepartment.value.errors = {};
  let isValid = true;

  if (!newDepartment.value.name.trim()) {
    newDepartment.value.errors.name = "Department name is required.";
    isValid = false;
  } else if (newDepartment.value.name.length < 2) {
    newDepartment.value.errors.name = "Department name must be at least 2 characters long.";
    isValid = false;
  }

  if (!newDepartment.value.description.trim()) {
    newDepartment.value.errors.description = "Description is required.";
    isValid = false;
  } else if (newDepartment.value.description.length < 10) {
    newDepartment.value.errors.description = "Description must be at least 10 characters.";
    isValid = false;
  }

  if (newDepartment.value.employeeCount <= 0) {
    newDepartment.value.errors.employeeCount = "Employee count must be greater than 0.";
    isValid = false;
  }

  return isValid;
};

const addDepartment = () => {
  if (!validateNewDepartment()) return;

  departments.value.push({
    id: departments.value.length + 1,
    name: newDepartment.value.name,
    description: newDepartment.value.description,
    employeeCount: newDepartment.value.employeeCount,
  });

  showAddModal.value = false;
  newDepartment.value = { name: '', description: '', employeeCount: 0, errors: {} };
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
          Add Department
        </button>

        <!-- List Departments Button -->
        <button
          class="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <ListBulletIcon class="h-5 w-5 mr-2" />
          List of Departments
        </button>
      </div>
    </div>

    <!-- Departments List -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employees</th>
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
                Edit
              </button>
              <button
                @click="openDetailsModal(department)"
                class="inline-flex items-center px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                <EyeIcon class="h-4 w-4 mr-1" />
                Details
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add Department Modal -->
    <div v-if="showAddModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">Add a Department</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Name</label>
            <input
              v-model="newDepartment.name"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <p v-if="newDepartment.errors.name" class="text-red-500 text-xs mt-1">{{ newDepartment.errors.name }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              v-model="newDepartment.description"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            ></textarea>
            <p v-if="newDepartment.errors.description" class="text-red-500 text-xs mt-1">{{ newDepartment.errors.description }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Number of Employees</label>
            <input
              v-model.number="newDepartment.employeeCount"
              type="number"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <p v-if="newDepartment.errors.employeeCount" class="text-red-500 text-xs mt-1">{{ newDepartment.errors.employeeCount }}</p>
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
            @click="addDepartment"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
