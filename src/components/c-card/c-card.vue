<template>
  <div :class="bem()">
    <div :class="[bem('header'), headerClass]" v-if="$slots.header">
      <div class="label">
        <slot name="header"></slot>
      </div>
    </div>
    <div :class="[bem('main'), mainClass]">
      <slot name="main"></slot>
    </div>
    <div :class="[bem('footer'), footerClass]" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import create from 'utils/create/basic'

export default create({
  name: 'card',
  props: {
    headerClass: String,
    mainClass: String,
    footerClass: String
  },

  methods: {
  }
})
</script>

<style lang='less'>
.c-card {
  position: relative;
  margin: 13px @safe-width 12px @safe-width;
  background-color: @default-background;

  &__header {
    display: flex;
    justify-content: space-between;
    padding: 21px 0px 15px 0px;
    margin: 0 28px 0 21px;

    border-radius: 4px 4px 0 0;
    border-bottom: 1px solid @default-border;
    font-size: @f14;
    .label {
      color: @title-color;
      line-height: 20px;
      span {
        color: @label-color;
        font-weight: bold;
        font-size: @f16;
      }
    }
  }
  &__main {
    padding:10px 9px;
    border-radius: 4px;
  }
  &__footer {
    text-align: right;
    .btn{
      font-size: @f14;
      color :@default-color;
      background-color: @default-background;
      border: 1PX solid @default-border;
      padding: 7px 12px;
      border-radius: 4px;
      margin-bottom: 16px;
      margin-right: 9px;
    }
  }
}
</style>
