import { useStore } from '@/stores'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  document.title = `${to.meta.title} | Farmácia UFRJ`

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresUnauth = to.matched.some(record => record.meta.requiresUnauth)
  const store = useStore()
  const isAutenticated = await store.getCurrentUser()

  if (requiresAuth && !isAutenticated) next({ name: 'login' })
  else if (requiresUnauth && isAutenticated) next({ name: 'home' })
  else next()
})

export default router
