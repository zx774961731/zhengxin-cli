import {
  createRouter,
  createWebHistory,
  createWebHashHistory
} from 'vue-router';
import Home from '@/views/home.vue';
const routes = [
  {
    name: '',
    path: '/',
    redirect: '/a'
  },
  {
    name: 'a',
    path: '/a',
    component: () => import('@/views/a.vue')
  },
  {
    name: 'b',
    path: '/b',
    component: () => import('@/views/b.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});
export default router;
