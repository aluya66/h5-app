<template>
  <div :class="[bem(), noSafe ? '' : 'c-scroll__safe', ]"
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="status"
    infinite-scroll-distance="distance"
  >
    <slot></slot>
    <p v-show="loading" :class="bem('loading')">
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="30px" height="50px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve">
        <rect x="0" y="10.7446" width="4" height="9.51083" fill="#9B9BA1">
          <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0s" dur="0.6s" repeatCount="indefinite"></animate>
          <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0s" dur="0.6s" repeatCount="indefinite"></animate>
        </rect>
        <rect x="10" y="6.74459" width="4" height="17.5108" fill="#9B9BA1">
          <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate>
          <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate>
        </rect>
        <rect x="20" y="7.25541" width="4" height="16.4892" fill="#9B9BA1">
          <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate>
          <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate>
        </rect>
      </svg>
      <!-- <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        width="50px" height="50px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
        <path fill="#000" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
          <animateTransform attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="0.6s"
            repeatCount="indefinite"/>
        </path>
      </svg> -->
      <span>加載中</span>
    </p>
    <!-- <p v-show="noMore" :class="bem('nomore')">- 没有更多的数据 -</p> -->
  </div>
</template>
<script>
import create from 'utils/create/basic'
import infiniteScroll from 'vue-infinite-scroll'

export default create({
  name: 'scroll',
  props: {
    status: Boolean, // 是否无线加载数据，true为关闭
    loading: Boolean,
    noMore: Boolean,
    noSafe: Boolean,
    distance: {
      type: Number,
      default: 10
    }
  },
  directives: { infiniteScroll },
  methods: {
    loadMore () {
      this.$emit('getData')
    }
  }
})
</script>

<style lang="less">
.c-scroll {
  overflow-y: auto;
  max-height: calc(100vh - @page-sroll-top-height);

  &__safe{
    padding: 0 @safe-width;
  }

  &__loading, &__nomore {
    margin-top: 5px;
    height: 20px;
    line-height: 20px;
    font-size: @f14;
    vertical-align: middle;
    text-align: center;
    color: @text-sub-color;

    & span{
       position: relative;
       top: -5px;
       left: 5px;
    }
  }
}
</style>
