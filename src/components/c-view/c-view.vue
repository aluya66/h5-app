<template>
  <div :class="bem()">
    <div :class="[bem('header'), headerBg && bem(headerBg)]">
      <div @click="emitPopup" :class="[bem('header--title'), titleClass && bem(titleClass)]">
        {{title}}
        <c-icon v-if="icon" :class-name="icon"></c-icon>
      </div>
      <slot name="header"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import create from 'utils/create/basic'

export default create({
  name: 'view',
  props: {
    title: String,
    headerBg: String,
    titleClass: String,
    icon: String
  },
  methods: {
    emitPopup () {
      this.$emit('showPopup', true)
    }
  }
})
</script>

<style lang="less">
.c-view {
  position: relative;
  background-color: @background-color;
  background-size: 100% 100%;
  color: @text-title-color;
  height: 100vh;

  &__white {
    background-color: @text-white;
  }

  &__header {
    &--title {
      font-size: @f24;
      line-height: @f24;
      // font-family: @ff-Semibold;
      .safeWidth();
    }
  }
}
</style>
