import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/IndexView.vue'

const routes = [
  {
    path: '/',
    name: 'IndexView',
    component: IndexView,
  },
  {
    path: '/watcher',
    name: 'Watcher',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "watcher" */ '../views/WatcherView.vue')
  },
  {
    path: '/traveler',
    name: 'Traveler',
    component: () => import(/* webpackChunkName: "traveler" */ '../views/TravelerView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
