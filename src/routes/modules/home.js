import Goods from '@/views/home/goods.vue'
import Order from '@/views/home/order.vue'
import Customer from '@/views/home/customer.vue'
import Shop from '@/views/home/shop.vue'

export default {
  path: '/',
  name: 'home',
  meta: {
    title: 'route.home',
    requireAuth: false
  },
  component: () => import('@/views/home/index.vue'),
  children: [{
    path: '/',
    name: 'goods',
    component: Goods,
    meta: {
      title: 'route.goods',
      requireAuth: false
    }
  },
  {
    path: '/order',
    name: 'order',
    component: Order,
    meta: {
      title: 'route.order',
      requireAuth: false
    }
  },
  {
    path: '/customer',
    name: 'customer',
    component: Customer,
    meta: {
      title: 'route.customer',
      requireAuth: false
    }
  }, {
    path: '/shop',
    name: 'shop',
    component: Shop,
    meta: {
      title: 'route.shop',
      requireAuth: false
    }
  }]
}
