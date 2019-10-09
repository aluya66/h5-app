<template>
  <layout-view>
    <!-- <c-tabbar></c-tabbar> -->
  </layout-view>
</template>

<script>
import components from 'components'
const {CTabbar} = components

export default {
  data () {
    return {}
  },

  methods: {

  },

  components: {
    CTabbar
  }
}
</script>

<style lang='less'>
.aa, .bb,.cc {
  background: @white;
  height: 300px;
  line-height: 300px;
}
</style>
