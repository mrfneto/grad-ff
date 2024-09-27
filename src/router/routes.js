import auth from './auth'

export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { requiresAuth: true, title: 'Home' }
  },

  // AUTH
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/LoginView.vue'),
    meta: { requiresUnauth: true, title: 'Login' }
  },

  // IRREGULARIDADES
  {
    path: '/semesters',
    name: 'semesters',
    component: () => import('@/views/semesters/List.vue'),
    meta: { requiresAuth: true, title: 'Semestres' }
  },
  {
    path: '/semesters/add',
    name: 'semesters-add',
    component: () => import('@/views/semesters/Form.vue'),
    meta: { requiresAuth: true, title: 'Semestres' }
  },
  {
    path: '/semesters/:id/edit',
    name: 'semesters-edit',
    component: () => import('@/views/semesters/Form.vue'),
    meta: { requiresAuth: true, title: 'Semestres' }
  },

  // COORDENADORES
  {
    path: '/teachers',
    name: 'teachers',
    component: () => import('@/views/teachers/List.vue'),
    meta: { requiresAuth: true, title: 'Coordenadores' }
  },
  {
    path: '/teachers/add',
    name: 'teachers-add',
    component: () => import('@/views/teachers/Form.vue'),
    meta: { requiresAuth: true, title: 'Coordenadores' }
  },
  {
    path: '/teachers/:id/edit',
    name: 'teachers-edit',
    component: () => import('@/views/teachers/Form.vue'),
    meta: { requiresAuth: true, title: 'Coordenadores' }
  },

  // IRREGULARIDADES
  {
    path: '/irregularities',
    name: 'irregularities',
    component: () => import('@/views/irregularities/List.vue'),
    meta: { requiresAuth: true, title: 'Irregularidades' }
  },
  {
    path: '/irregularities/add',
    name: 'irregularities-add',
    component: () => import('@/views/irregularities/Form.vue'),
    meta: { requiresAuth: true, title: 'Irregularidades' }
  },
  {
    path: '/irregularities/:id/edit',
    name: 'irregularities-edit',
    component: () => import('@/views/irregularities/Form.vue'),
    meta: { requiresAuth: true, title: 'Irregularidades' }
  },

  // NOT FOUND
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: '404' }
  }
]
