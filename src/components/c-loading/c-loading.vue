<template>
  <transition name="load-indicator">
    <div :class="bem()" v-show="isShow">
      <div class="c-load__wrapper">
        <c-spinner class="c-load__spin" :size="size"></c-spinner>
        <span class="c-load__text" v-show="text">{{ text }}</span>
      </div>
      <div class="c-load__mask" @touchmove.stop.prevent></div>
    </div>
  </transition>
</template>

<script>
import create from 'utils/create/basic'

export default create({
  name: 'load',
  props: {
    text: String,
    size: String,
    isShow: {
      type: Boolean,
      default: true
    }
  }
})
</script>

<style lang="less">
.c-load {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  transition: opacity 0.2s linear;
  &__wrapper {
    position: fixed;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    box-sizing: border-box;
    text-align: center;
    z-index: 3000;
    padding: 30px 30px;
  }
  &__text {
    display: block;
    color: #fff;
    text-align: center;
    margin-top: 10px;
    font-size: 16px;
  }
  &__spin {
    display: inline-block;
    text-align: center;
  }
  &__mask {
    position: fixed;
    size: 100%;
    opacity: 0;
    background: transparent;
    z-index: 3000;
  }
}
.load-indicator-enter,
.load-indicator-leave-active {
  opacity: 0;
}
</style>
