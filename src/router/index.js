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
    path: '/search',
    name: 'search',
    component: () => import('@/views/article/SearchPage.vue'),
  },
  {
    path: '/artist/:id',
    name: 'artist',
    component: () => import('@/views/user/ArtistPage.vue'),
  },
  {
    path: '/login',
    name: 'user.login',
    component: () => import('@/views/user/LoginPage.vue')
  },
  {
    path: '/logout',
    name: 'user.logout',
    component: () => import('@/views/user/LogoutPage.vue'),
  },
  {
    path: '/signup',
    name: 'user.signup',
    component: () => import('@/views/user/SignupPage1.vue')
  },
  {
    path: '/signup/form',
    name: 'user.signup.form',
    component: () => import('@/views/user/SignupPage2.vue'),
    props: true
  },
  {
    path: '/findid1',
    name: 'user.findid1',
    component: () => import('@/views/user/FindIdPage1.vue')
  },
  {
    path: '/findid2',
    name: 'user.findid2',
    component: () => import('@/views/user/FindIdPage2.vue'),
    props: true
  },
  {
    path: '/findpw1',
    name: 'user.findpw1',
    component: () => import('@/views/user/FindPwPage1.vue')
  },
  {
    path: '/findpw2',
    name: 'user.findpw2',
    component: () => import('@/views/user/FindPwPage2.vue'),
    props: true
  },
  {
    path: '/user/account',
    name: 'user.account',
    component: () => import('@/views/user/AccountPage.vue'),
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/user/pwauth',
    name: 'user.pwauth',
    component: () => import('@/views/user/PwAuthPage.vue'),
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/user/withdrawal',
    name: 'user.withdrawal',
    component: () => import('@/views/user/WithdrawalPage.vue'),
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/notice',
    name: 'notice.list',
    component: () => import('@/views/notice/ListPage.vue')
  },
  {
    path: '/notice/view',
    name: 'notice.view',
    component: () => import('@/views/notice/ViewPage.vue')
  },
  {
    path: '/notice/write',
    name: 'notice.write',
    component: () => import('@/views/notice/WritePage.vue')
  },
  {
    path: '/notice/modify',
    name: 'notice.modify',
    component: () => import('@/views/notice/ModifyPage.vue'),
    props: true
  },
  {
    path: '/message',
    name: 'message',
    component: () => import('@/views/utils/MessagePage.vue'),
    props: true
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/utils/TestPage.vue')
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