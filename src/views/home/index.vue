<template>
  <div>
    <div class="main">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </div>
    <van-tabbar v-model="active" @change="changeTabbar(active)">
      <van-tabbar-item :icon="routeLinks[0].icon">{{routeLinks[0].title}}</van-tabbar-item>
      <van-tabbar-item :icon="routeLinks[1].icon">{{routeLinks[1].title}}</van-tabbar-item>
      <van-tabbar-item info="3">
        <img slot="icon" slot-scope="props" :src="props.active ? icon.active : icon.normal">
      </van-tabbar-item>
      <van-tabbar-item :icon="routeLinks[3].icon">{{routeLinks[0].title}}</van-tabbar-item>
      <van-tabbar-item :icon="routeLinks[4].icon">{{routeLinks[4].title}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>

import { Tabbar, TabbarItem } from 'vant'

export default {
  data () {
    return {
      active: 0,
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
      icon: {
        normal: '//img.yzcdn.cn/icon-normal.png',
        active: '//img.yzcdn.cn/icon-active.png'
      }
    }
  },
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  created () {
    this.changeTabBarActive()
  },
  updated () {
    this.changeTabBarActive()
  },
  methods: {
    changeTabbar (active) {
      this.$store.commit('APP_DIRECTION', 'forward')
      this.$router.push(this.routeLinks[active].link)
    },
    // 判断路径
    changeTabBarActive () {
      this.active = this.routeLinks.findIndex(item => item.link === this.$route.path)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
