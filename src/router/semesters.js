export default [
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
  }
]
