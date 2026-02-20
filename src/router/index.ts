import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('../views/LandingView.vue')
    },
    {
      path: '/shop',
      name: 'shop',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/product/:id',
      name: 'product-detail',
      component: () => import('../views/ProductDetail.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    }
  ],
  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;
