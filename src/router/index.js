// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth';

const routes = [
  {
    path: '/',
    // component: () => import('@/layouts/default/Default.vue'),
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/pages/home.vue'),
      },
      {
        path: 'winamax',
        component: () => import('@/pages/winamax.vue'),
      },
      {
        path: 'betclic',
        component: () => import('@/pages/betclic.vue'),
      },
      {
        path: 'unibet',
        component: () => import('@/pages/unibet.vue'),
      },
      {
        path: 'parions-sport-en-ligne',
        component: () => import('@/pages/parions-sport-en-ligne.vue'),
      },
      {
        path: 'zebet',
        component: () => import('@/pages/zebet.vue'),
      },
      {
        path: 'pmu',
        component: () => import('@/pages/pmu.vue'),
      },
      {
        path: 'account',
        name: 'Account',
        component: () => import('@/pages/account.vue'),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: '/',
    component: () => import('@/layouts/blank.vue'),
    children: [
      {
        path: 'login',
        component: () => import('@/pages/auth/login.vue'),
      },
      {
        path: 'register',
        component: () => import('@/pages/auth/register.vue'),
      },
      {
        path: 'forgot-password',
        component: () => import('@/pages/auth/forgot-password.vue'),
      },
      {
        path: 'password-reset/:token',
        component: () => import('@/pages/auth/reset-password.vue'),
      },
    ],
  },
  {
    // Route wildcard pour capturer toutes les autres routes non définies
    path: '/:pathMatch(.*)*',
    redirect: { name: 'Home' }, // Redirige vers la route avec le nom 'Home'
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.user) return '/login'
})

export default router
