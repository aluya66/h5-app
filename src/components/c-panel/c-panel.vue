<template>
  <div :class="[bem(), className]">
    <div :class="bem('label')">
      <div class="title">{{label}}</div>
      <div v-if="isShow" :class="bem('label--more')" @click="goToPage">
        <slot name="right">{{curTitle}} ></slot>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import create from 'utils/create/basic'
import { routerLink } from 'utils'

export default create({
  name: 'panel',
  props: {
    label: String,
    isShow: Boolean,
    className: String,
    panelData: [String, Object]
  },
  computed: {
    curTitle () {
      if (typeof this.panelData === 'object') {
        return this.panelData.title
      }
      return this.panelData
    }
  },
  methods: {
    goToPage () {
      if (!this.panelData) return
      if (this.isShow && typeof this.panelData === 'object') {
        this.panelData.url && routerLink(this.panelData.url)
      }
      this.$emit('emit-panel', this.panelData)
    }
  }
})
</script>

<style lang='less'>
.c-panel {
  margin-bottom: 9px;
  padding: 10px 12px;
  background-color: @background-color;
  overflow: hidden;

  &__label {
    padding-left: 4px;
    font-size: 14px;
    line-height: 19px;
    margin-bottom: 11px;
    display: flex;
    justify-content: space-between;

    &--more {
      position: relative;
      color: @title-color;
      font-size: 12px;
    }
  }
}
</style>
