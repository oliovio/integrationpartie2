<script setup>
import { ref, onMounted } from 'vue';
import { useEquipmentStore } from '../stores/equipment';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const equipmentStore = useEquipmentStore();

const equipmentByType = ref({
  labels: [],
  datasets: [{
    label: 'Equipment by Type',
    data: [],
    backgroundColor: '#4CAF50',
  }],
});

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Equipment Distribution by Type',
    },
  },
};

onMounted(() => {
  const typeCount = {};
  equipmentStore.equipment.forEach(item => {
    typeCount[item.type] = (typeCount[item.type] || 0) + 1;
  });

  equipmentByType.value.labels = Object.keys(typeCount);
  equipmentByType.value.datasets[0].data = Object.values(typeCount);
});
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Reports</h1>

    <div class="grid grid-cols-1 gap-6">
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-bold mb-4">Equipment Distribution</h2>
        <Bar :data="equipmentByType" :options="options" />
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-bold mb-4">Equipment Status Summary</h2>
        <div class="grid grid-cols-3 gap-4">
          <div v-for="status in ['In Use', 'Maintenance', 'Available']" :key="status" class="p-4 rounded-lg bg-gray-50">
            <h3 class="text-sm text-gray-500">{{ status }}</h3>
            <p class="text-2xl font-bold">
              {{ equipmentStore.getEquipmentByStatus(status).length }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>