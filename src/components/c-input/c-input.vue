<template>
  <div :class="bem()">
    <c-icon v-if="preIcon" :name="preIcon" :class="iconClass"></c-icon>
    <div class="left" v-else>
      <slot name="left">{{label}}</slot>
    </div>
    <input
      :class="[ !!$slots.right ? 'right-class' : '', inputClass]"
      type="text"
      :style="{textAlign: dir}"
      v-bind="$attrs"
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    />
    <div class="right" @click="rightHandle">
      <slot name="right"></slot>
      <c-icon v-if="afterIcon" :name="afterIcon" class="right-icon icon-small"></c-icon>
    </div>
  </div>
</template>

<script>
import create from 'utils/create/basic'

export default create({
  name: 'input',
  inheritAttrs: false,
  props: {
    label: String,
    preIcon: String,
    afterIcon: String,
    iconClass: String,
    inputClass: String,
    hasRight: {
      type: Boolean,
      default: false
    },
    dir: String,
    value: [String, Number]
  },
  methods: {
    rightHandle () {
      this.$emit('right-handle')
    }
  }
})
</script>

<style lang="less">
.c-input {
  position: relative;
  display: flex;
  padding: 15px 0;
  margin: 0px 24px;
  line-height: 20px;
  border-bottom: 1px solid @default-border;

  .left {
    float: left;
    width: 80%;
  }

  input {
    margin-left: 12px;
    font-size: @f14;
    width: 90%;
    text-align: left;
    margin-right: 30px;
    background-color: transparent;

    &.right-class {
      width: 60%;
      margin-right: 90px;
      margin-left: 10px;
    }
  }

  .right {
    position: absolute;
    right: 0;
    line-height: 20px;

    .right-icon {
      position: relative;
      top: -4px;
      margin-left: 5px;
      color: @title-color;
    }
  }

  &:last-child {
    border-bottom: none;
  }

  .input-btn {
    margin-top: -12px;
    border: 1px solid @default-border;
    display: inline-block;
    padding: 5px 5px;
    min-width: 50px;
    text-align: center;
    border-radius: 4px;
    color: @label-color;
    font-weight: 600;
  }
}
</style>
