<template>
  <div id="app">
    <transition :name="slideStatus">
      <router-view/>
    </transition>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'c-app',
  data () {
    return {
      slideStatus: 'slide-left'
    }
  },
  computed: {
    ...mapGetters([
      'fadeDirection'
    ])
  },
  watch: {
    '$route' (to, from) {
      if (this.fadeDirection === 'forward') {
        this.slideStatus = 'slide-right'
      } else {
        this.slideStatus = 'slide-left'
      }
    }
  },
  mounted () {
    window.addEventListener(
      'popstate', () => {
        this.$store.commit('APP_DIRECTION', 'back')
      },
      false
    )
  }
}

</script>
<style lang='less'>
@import "~themes/styles/base.less";
</style>
