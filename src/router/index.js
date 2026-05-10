import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getAuth, onAuthStateChanged } from "firebase/auth";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomeView,
            meta: {
                requiresAuth: true
            },
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginView.vue'),
        },
        {
            path: '/create-account',
            name: 'create-account',
            component: () => import('../views/CreateAccountView.vue'),
        },
        {
            path: '/profile/:username?',
            name: 'profile',
            component: () => import('../views/ProfileView.vue'),
            meta: {
                requiresAuth: true
            },
        }
    ],
})

// had to google this, but this routes users not logged in to the login page, otherwise it goes to the home page.
router.beforeEach((to, from) => {
  if (!to.matched.some(record => record.meta.requiresAuth)) return true;

  // Wait for Firebase Auth to initialize so refreshes don't incorrectly redirect
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      unsubscribe();
      if (user) resolve(true);
      else resolve('/login');
    });
  });
});

export default router