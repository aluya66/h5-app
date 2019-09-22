<template>
  <div :class="bem()">
    <div :class="bem('title')">
      <div :class="bem('title--left')">
        <img :src="imgSrc" @click="goBack" alt>
      </div>
      <p :class="bem('title--center')">
        <slot></slot>
      </p>
      <p :class="bem('title--right')">
        <slot name="right"></slot>
      </p>
    </div>
  </div>
</template>
<script>
import create from 'utils/create/basic'

export default create({
  name: 'header',
  props: {
    color: {
      type: String,
      default: 'white'
    },
    imgSrc: String
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
})
</script>

<style lang='less'>
.c-header {
  position: relative;
  background: @header-bg-color;
  &__title {
    display: flex;
    justify-content: space-between;
    height: @page-header-height;
    align-items: center;
    &--left {
      img {
        vertical-align: middle;
        display: inline-block;
        width: 10px;
        height: 17.5px;
      }
    }
    &--right {
      .fontSize(@f32);
      color: #006bff;
      text-align: right;
      line-height: @f32;
    }
  }
}
</style>
