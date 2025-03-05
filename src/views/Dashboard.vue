<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useEquipmentStore } from '../stores/equipment';
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { 
  ComputerDesktopIcon, 
  WrenchScrewdriverIcon, 
  CheckCircleIcon,
  ExclamationCircleIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/vue/24/outline';

const router = useRouter();
const equipmentStore = useEquipmentStore();

ChartJS.register(ArcElement, Tooltip, Legend);

const statistics = ref({
  total: 0,
  inUse: 0,
  maintenance: 0,
  available: 0,
});

const departments = ref([
  { id: 1, name: 'IT Department', employeeCount: 15, equipmentCount: 45 },
  { id: 2, name: 'HR Department', employeeCount: 8, equipmentCount: 16 },
  { id: 3, name: 'Finance', employeeCount: 12, equipmentCount: 24 },
]);

const chartData = ref({
  labels: ['Laptop', 'Desktop', 'Printer', 'Monitor', 'Server'],
  datasets: [{
    data: [0, 0, 0, 0, 0],
    backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
    borderWidth: 0,
    borderRadius: 5,
  }],
});

const chartOptions = {
  responsive: true,
  cutout: '75%',
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        padding: 20,
        font: {
          size: 12
        }
      }
    }
  }
};

const recentActivities = ref([
  { id: 1, type: 'assignment', description: 'Laptop X1 Carbon assigned to John Doe', time: '2h ago' },
  { id: 2, type: 'maintenance', description: 'Server R720 scheduled for maintenance', time: '4h ago' },
  { id: 3, type: 'addition', description: 'New iPad Pro added to inventory', time: '1d ago' },
]);

const navigateTo = (path) => {
  router.push(path);
};

const handleLogout = () => {
  // Add your logout logic here
  router.push('/login');
};

onMounted(() => {
  // Update statistics
  statistics.value = {
    total: equipmentStore.getTotalEquipment,
    inUse: equipmentStore.getEquipmentByStatus('In Use').length,
    maintenance: equipmentStore.getEquipmentByStatus('Maintenance').length,
    available: equipmentStore.getEquipmentByStatus('Available').length,
  };

  // Update chart data
  const equipmentByType = {};
  equipmentStore.equipment.forEach(item => {
    equipmentByType[item.type] = (equipmentByType[item.type] || 0) + 1;
  });

  chartData.value.datasets[0].data = [
    equipmentByType['Laptop'] || 0,
    equipmentByType['Desktop'] || 0,
    equipmentByType['Printer'] || 0,
    equipmentByType['Monitor'] || 0,
    equipmentByType['Server'] || 0,
  ];
});
</script>

<template>
  <div class="p-8 bg-gray-50 min-h-screen">
    <div class="mb-8 flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Welcome Back</h1>
        <p class="text-gray-500 mt-2">Here's what's happening with your equipment today.</p>
      </div>
      <button 
        @click="handleLogout" 
        class="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        <ArrowRightOnRectangleIcon class="h-5 w-5 mr-2" />
        Logout
      </button>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <ComputerDesktopIcon class="h-6 w-6 text-blue-600" />
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-500">Total Equipment</h3>
            <p class="text-2xl font-semibold text-gray-900">{{ statistics.total }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 rounded-lg">
            <CheckCircleIcon class="h-6 w-6 text-green-600" />
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-500">In Use</h3>
            <p class="text-2xl font-semibold text-gray-900">{{ statistics.inUse }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div class="flex items-center">
          <div class="p-2 bg-yellow-100 rounded-lg">
            <WrenchScrewdriverIcon class="h-6 w-6 text-yellow-600" />
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-500">In Maintenance</h3>
            <p class="text-2xl font-semibold text-gray-900">{{ statistics.maintenance }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div class="flex items-center">
          <div class="p-2 bg-purple-100 rounded-lg">
            <ExclamationCircleIcon class="h-6 w-6 text-purple-600" />
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-500">Available</h3>
            <p class="text-2xl font-semibold text-gray-900">{{ statistics.available }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts and Activity -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Equipment Distribution Chart -->
      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100 lg:col-span-1">
        <h3 class="text-lg font-semibold mb-4">Equipment Distribution</h3>
        <div class="relative h-64">
          <Doughnut :data="chartData" :options="chartOptions" />
        </div>
      </div>

      <!-- Department Overview -->
      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100 lg:col-span-1">
        <h3 class="text-lg font-semibold mb-4">Department Overview</h3>
        <div class="space-y-4">
          <div v-for="dept in departments" :key="dept.id" class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div class="flex items-center">
              <BuildingOfficeIcon class="h-6 w-6 text-gray-400" />
              <div class="ml-3">
                <h4 class="text-sm font-medium text-gray-900">{{ dept.name }}</h4>
                <p class="text-sm text-gray-500">{{ dept.employeeCount }} employees</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-sm font-medium text-gray-900">{{ dept.equipmentCount }}</p>
              <p class="text-xs text-gray-500">items</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activities -->
      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100 lg:col-span-1">
        <h3 class="text-lg font-semibold mb-4">Recent Activities</h3>
        <div class="space-y-4">
          <div v-for="activity in recentActivities" :key="activity.id" class="flex items-start space-x-3">
            <div class="flex-shrink-0">
              <div class="p-2 rounded-full" :class="{
                'bg-blue-100': activity.type === 'assignment',
                'bg-yellow-100': activity.type === 'maintenance',
                'bg-green-100': activity.type === 'addition'
              }">
                <ComputerDesktopIcon v-if="activity.type === 'assignment'" class="h-5 w-5 text-blue-600" />
                <WrenchScrewdriverIcon v-if="activity.type === 'maintenance'" class="h-5 w-5 text-yellow-600" />
                <CheckCircleIcon v-if="activity.type === 'addition'" class="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div class="min-w-0 flex-1">
              <p class="text-sm text-gray-900">{{ activity.description }}</p>
              <p class="text-xs text-gray-500">{{ activity.time }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>