export default {
  path: '/personalAdd',
  name: 'personalAdd',
  meta: {
    title: '添加就诊人',
    keepAlive: true
  },
  component: () => import('@/views/demos/personal/add.vue')
}
