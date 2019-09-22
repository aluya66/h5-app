export default {
  path: '/personal',
  name: 'personal',
  meta: {
    title: '个人中心'
  },
  component: () => import('@/views/personal/index.vue')
}
