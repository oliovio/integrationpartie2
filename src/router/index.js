import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Dashboard from '../views/Dashboard.vue';
import EquipmentList from '../views/EquipmentList.vue';
import Maintenance from '../views/Maintenance.vue';
import Login from '../views/auth/Login.vue';
import Signup from '../views/auth/Signup.vue';
import Department from '../views/Department.vue';
import Services from '../views/Services.vue';
import Pricing from '../views/Pricing.vue';
import Contact from '../views/Contact.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: false, showSidebar: false }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true, showSidebar: true }
  },
  {
    path: '/equipment',
    name: 'Equipment',
    component: EquipmentList,
    meta: { requiresAuth: true, showSidebar: true }
  },
  {
    path: '/equipment/:id',
    name: 'EquipmentDetails',
    component: EquipmentList,
    meta: { requiresAuth: true, showSidebar: true }
  },
  {
    path: '/maintenance',
    name: 'Maintenance',
    component: Maintenance,
    meta: { requiresAuth: true, showSidebar: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false, showSidebar: false }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    meta: { requiresAuth: false, showSidebar: false }
  },
  {
    path: '/departments',
    name: 'Department',
    component: Department,
    meta: { requiresAuth: true, showSidebar: true }
  },
  {
    path: '/services',
    name: 'Services',
    component: Services,
    meta: { requiresAuth: false, showSidebar: false }
  },
  {
    path: '/pricing',
    name: 'Pricing',
    component: Pricing,
    meta: { requiresAuth: false, showSidebar: false }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: { requiresAuth: false, showSidebar: false }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// Navigation guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;