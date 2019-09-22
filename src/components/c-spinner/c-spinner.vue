
<template>
  <div
    :class="bem()"
    :style="{
    'border-top-color': spinnerColor,
    'border-left-color': spinnerColor,
    'border-bottom-color': spinnerColor,
    'height': spinnerSize,
    'width': spinnerSize
    }"
  ></div>
</template>

<script>
import create from 'utils/create/basic'

export default create({
  name: 'spinner',
  computed: {
    spinnerColor () {
      return this.color || this.$parent.color || '#ccc'
    },
    spinnerSize () {
      return `${(this.size || this.$parent.size)}px`
    }
  },
  props: {
    size: String,
    color: String
  }
})
</script>

<style lang="less">
.c-spinner {
  animation: c-spinner-rotate 0.8s infinite linear;
  border: 4px solid transparent;
  border-radius: 50%;
  height: 28px;
  width: 28px;
}

@keyframes c-spinner-rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
