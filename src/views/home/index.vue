<template>
  <div class="main">
    <c-header :left-arrow="false">
      <template v-slot:left>
        <span>首页</span>
      </template>
    </c-header>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <c-tabbar :route-links="routeLinks" :custom-icon="customIcons"></c-tabbar>
  </div>
</template>

<script>
import CHeader from 'components/c-header'
import CTabbar from 'components/c-tabbar'

export default {
  data () {
    return {
      routeLinks: [{
        title: '商品',
        link: '/',
        icon: 'goods'
      },
      {
        title: '订单',
        link: '/order',
        icon: 'order'
      },
      {
        title: '+',
        link: '/orderAdd'
      },
      {
        title: '客户',
        link: '/customer',
        icon: 'customer'
      }, {
        title: '店铺',
        link: '/shop',
        icon: 'shop'
      }],
      customIcons: {
        normal: '//img.yzcdn.cn/icon-normal.png',
        active: '//img.yzcdn.cn/icon-active.png'
      }
    }
  },
  components: {
    CTabbar,
    CHeader
  }
}
</script>

<style lang="less" scoped>
.main {
  height: 100vh;
  overflow: hidden;
}
</style>
