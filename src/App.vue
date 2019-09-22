<template>
  <div id="app" class="c-app">
    <keep-alive>
      <router-view class="app" v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view class="app" v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>

export default {
  name: 'c-app'
}
</script>
<style lang='less'>
@import '~themes/styles/base.less';
</style>
