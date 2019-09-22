<template>
  <div :class="[bem(), className]" v-if="show">
    <div :class="bem('popup')">
      <div :class="[bem('popup--header'), headClass]">
        <span>{{title}}</span>
        <c-icon name="guanbi1" @click-icon="closeHandle"></c-icon>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
import create from 'utils/create/basic'

export default create({
  name: 'popup',
  props: {
    className: String,
    title: String,
    show: Boolean,
    headClass: String
  },
  methods: {
    closeHandle () {
      this.$emit('update:show', false)
    }
  }
})
</script>
<style lang='less'>
.c-popup {
  width: 100%;
  height: 100%;
  position: fixed;
  background: @opacity-bg-color;
  top: 0;
  &__popup {
    width: 100%;
    position: absolute;
    height: 300px;
    bottom:-300px;
    overflow: hidden;
    z-index: 2000;
    background: @background-color;
    animation: myfirst 0.5s cubic-bezier(0.075, 0.82, 0.165, 1) forwards;

    &--header{
      display: flex;
      justify-content: space-between;
      padding: 31px 28px 0px 28px;
      background-color: @default-background;
      color: @label-color;
      font-size: @f18;
    }
    .pad-bom{
      padding-bottom: 24px;
      border-bottom: 1PX solid @default-border;
    }
  }
}
@keyframes myfirst {
  from {
    bottom:-300px;
  }
  to {
    bottom:0;
  }
}
</style>
