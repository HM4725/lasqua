import { createRouter, createWebHistory } from 'vue-router'
import IndexPage from '@/views/index/IndexPage.vue'
import store from '@/store.js'

const routes = [
  {
    path: '/',
    name: 'index',
    component: IndexPage
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
    path: '/article/upload',
    name: 'article.upload',
    component: () => import('@/views/article/UploadPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/article/modify',
    name: 'article.modify',
    component: () => import('@/views/article/ModifyPage.vue'),
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/traveler',
    name: 'traveler',
    component: () => import('@/views/article/TravelerPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/artist/:id',
    name: 'artist',
    component: () => import('@/views/article/ArtistPage.vue'),
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/article/SearchPage.vue'),
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

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!(await store.dispatch('validateIdSession'))) {
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