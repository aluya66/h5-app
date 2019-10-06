import Goods from '@/views/home/goods.vue'
import Order from '@/views/home/order.vue'
import Customer from '@/views/home/customer.vue'
import Shop from '@/views/home/shop.vue'

export default {
  path: '/',
  name: 'home',
  meta: {
    requireAuth: false
  },
  component: () => import('@/views/home/index.vue'),
  children: [{
    path: '/',
    name: 'goods',
    component: Goods
  },
  {
    path: '/order',
    name: 'order',
    component: Order
  },
  {
    path: '/customer',
    name: 'customer',
    component: Customer
  }, {
    path: '/shop',
    name: 'shop',
    component: Shop
  }]
}
