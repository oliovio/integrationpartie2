import { defineStore } from 'pinia';

export const useEquipmentStore = defineStore('equipment', {
  state: () => ({
    equipment: [
      {
        id: 1,
        type: 'Laptop',
        model: 'ThinkPad X1 Carbon',
        serialNumber: 'LP2023001',
        status: 'In Use',
        assignedTo: 'John Doe',
      },
      {
        id: 2,
        type: 'Desktop',
        model: 'Dell OptiPlex 7090',
        serialNumber: 'DT2023002',
        status: 'Available',
        assignedTo: '',
      },
      {
        id: 3,
        type: 'Printer',
        model: 'HP LaserJet Pro',
        serialNumber: 'PR2023003',
        status: 'Maintenance',
        assignedTo: 'IT Support',
      },
      {
        id: 4,
        type: 'Monitor',
        model: 'Dell U2419H',
        serialNumber: 'MN2023004',
        status: 'In Use',
        assignedTo: 'Jane Smith',
      },
      {
        id: 5,
        type: 'Server',
        model: 'Dell PowerEdge R740',
        serialNumber: 'SV2023005',
        status: 'Available',
        assignedTo: '',
      }
    ],
    maintenanceRecords: [],
  }),
  
  getters: {
    getEquipmentById: (state) => (id) => {
      return state.equipment.find(item => item.id === id);
    },
    getTotalEquipment: (state) => {
      return state.equipment.length;
    },
    getEquipmentByStatus: (state) => (status) => {
      return state.equipment.filter(item => item.status === status);
    }
  },
  
  actions: {
    addEquipment(equipment) {
      const newId = Math.max(...this.equipment.map(e => e.id), 0) + 1;
      this.equipment.push({ ...equipment, id: newId });
    },
    
    updateEquipment(updatedEquipment) {
      const index = this.equipment.findIndex(e => e.id === updatedEquipment.id);
      if (index !== -1) {
        this.equipment[index] = updatedEquipment;
      }
    },
    
    deleteEquipment(id) {
      this.equipment = this.equipment.filter(e => e.id !== id);
    }
  },
});