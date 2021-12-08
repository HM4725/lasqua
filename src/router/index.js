import { createRouter, createWebHistory } from 'vue-router'
import IndexPage from '@/views/IndexPage.vue'
import store from '@/store.js'

const routes = [
  {
    path: '/',
    name: 'index',
    component: IndexPage,
  },
  {
    path: '/watcher',
    name: 'watcher',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "watcher" */ '../views/watcher/WatcherPage.vue'),
  },
  {
    path: '/watcher/view',
    name: 'watcherView',
    component: () => import(/* webpackChunkName: "watcherView" */ '../views/watcher/ViewPage.vue'),
  },
  {
    path: '/traveler',
    name: 'traveler',
    component: () => import(/* webpackChunkName: "traveler" */ '../views/traveler/TravelerPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/upload',
    name: 'upload',
    component: () => import(/* webpackChunkName: "upload" */ '../views/traveler/UploadPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/user/LoginPage.vue')
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import(/* webpackChunkName: "logout" */ '../views/user/LogoutPage.vue')
  },
  {
    path: '/myaccount',
    name: 'myaccount',
    component: () => import(/* webpackChunkName: "myaccount" */ '../views/user/MyAccountPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import(/* webpackChunkName: "signup" */ '../views/user/SignupPage.vue')
  },
  {
    path: '/message',
    name: 'message',
    component: () => import(/* webpackChunkName: "message" */ '../views/MessagePage.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: 'error',
    component: () => import(/* webpackChunkName: "error" */ '../views/ErrorPage.vue')
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