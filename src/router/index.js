import { createRouter, createWebHistory } from 'vue-router'
import {authFirebase} from "@/utils/firebase.config";
import {onAuthStateChanged} from "firebase/auth";

const routes = [
  {
    path: '/login',
    component: () => import('@/views/Login.vue'),
    meta:{ page: 'auth',}
  },
  {
    path: '/register',
    component: () => import('@/views/Register.vue'),
    meta:{ page: 'auth',}
  },
  {
    path: '/',
    component: () => import('@/views/Home.vue'),
    meta:{ page: 'main', auth: true,}
  },
  {
    path: '/categories',
    component: () => import('@/views/Categories.vue'),
    meta:{ page: 'main', auth: true,}
  },
  {
    path: '/detail/:id',
    component: () => import('@/views/Detail.vue'),
    meta:{ page: 'main', auth: true,}
  },
  {
    path: '/history',
    component: () => import('@/views/History.vue'),
    meta:{ page: 'main', auth: true,}
  },
  {
    path: '/planning',
    component: () => import('@/views/Planning.vue'),
    meta:{ page: 'main', auth: true,}
  },
  {
    path: '/profile',
    component: () => import('@/views/Profile.vue'),
    meta:{ page: 'main', auth: true,}
  },
  {
    path: '/record',
    component: () => import('@/views/Record.vue'),
    meta:{ page: 'main', auth: true,}
  },

  { path: "/:error(.*)", redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
  routes,
})

router.beforeEach((to, from, next) => {
  const isAuth = to.matched.some(rout => rout.meta.auth)

  onAuthStateChanged(authFirebase, (user) => {
    if (!user && isAuth && !localStorage.getItem('token')) {
      next('/login?message=login')
    } else {
      next()
    }
  });
})

export default router
