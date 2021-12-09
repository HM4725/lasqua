import { createRouter, createWebHistory } from 'vue-router'
import IndexLoginPage from '@/views/index/IndexLoginPage.vue'
import IndexLogoutPage from '@/views/index/IndexLogoutPage.vue'
import store from '@/store.js'

const routes = [
  {
    path: '/',
    name: 'index',
    beforeEnter: (to, from, next) => {
      if (store.getters['isLoggedIn']) {
        next({
          name: 'index.login'
        })
      } else {
        next({
          name: 'index.logout'
        })
      }
    }
  },
  {
    path: '/',
    name: 'index.login',
    component: IndexLoginPage
  },
  {
    path: '/',
    name: 'index.logout',
    component: IndexLogoutPage
  },
  {
    path: '/watcher',
    name: 'watcher',
    component: () => import('@/views/article/WatcherPage.vue'),
  },
  {
    path: '/article/view',
    name: 'article.view',
    component: () => import('@/views/article/ViewPage.vue'),
  },
  {
    path: '/traveler',
    name: 'traveler',
    component: () => import('@/views/article/TravelerPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/upload',
    name: 'upload',
    component: () => import('@/views/article/UploadPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/user/LoginPage.vue')
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import('@/views/user/LogoutPage.vue'),
  },
  {
    path: '/myaccount',
    name: 'myaccount',
    component: () => import('@/views/user/MyAccountPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/views/user/SignupPage.vue')
  },
  {
    path: '/message',
    name: 'message',
    component: () => import('@/views/utils/MessagePage.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: 'error',
    component: () => import('@/views/utils/ErrorPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters['isLoggedIn']) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router