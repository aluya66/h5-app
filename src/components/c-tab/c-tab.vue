<template>
  <div :class="[bem(), defaultClass]">
    <button
      :class="[
        { 'c-tab__item--active' : tab.value === currentTab },
        tab.value === currentTab && tabActiveClass ? tabActiveClass: '',
        bem('item'), tabClass
      ]"
      type="button"
      v-for="tab in tabs"
      :ref="tab.value"
      :key="tab.title"
      :disabled="tab.disabled || false"
      @click="handleClick(tab)"
    >{{tab.title}}</button>
    <div
      :class="[bem('active--line'), lineClass]"
      :style="{ 'background-color': lineColor, left: `${activeLineWidth*3/2}px`, width: `${activeLineWidth}px`, transform: `translateX(${activeLineOffset}px)` }"
    />
  </div>
</template>

<script>
import create from 'utils/create/basic'

export default create({
  name: 'tab',
  props: {
    currentTab: {
      type: String,
      required: true
    },
    tabs: {
      type: Array,
      required: true
    },
    defaultClass: {
      type: String,
      required: false
    },
    tabClass: {
      type: String,
      required: false
    },
    tabActiveClass: {
      type: String,
      required: false
    },
    lineClass: {
      type: String,
      required: false
    },
    lineColor: {
      type: String,
      required: false
    }
  },
  watch: {
    currentTab (newCurrentTab, oldTab) {
      if (this.newTab === newCurrentTab) return
      if (newCurrentTab !== oldTab) {
        this.moveActiveLine(newCurrentTab)
      }
    }
  },
  data: () => ({
    activeLineWidth: 0,
    activeLineOffset: 0,
    newTab: ''
  }),
  methods: {
    handleClick (tab) {
      this.$emit('onClick', tab)
      this.moveActiveLine(tab.value)
      this.newTab = tab.value
    },
    moveActiveLine (newValue) {
      const element = this.$refs[newValue] ? this.$refs[newValue][0] : null
      if (element) {
        this.activeLineWidth = element.clientWidth / 4
        this.activeLineOffset = element.offsetLeft
      }
    }
  },
  mounted () {
    this.moveActiveLine(this.currentTab)
  }
})
</script>

<style lang="less">
.c-tab {
  position: relative;
  margin: 0 auto;
  display: flex;
  background-color: @default-background;
  border-bottom: 1PX solid @default-border;
  box-shadow:0px 1px 0px 0px rgba(237,237,237,1);
  &__item {
    display: inline-block;
    font-size: @f14;
    text-decoration: none;
    border: none;
    background-color: transparent;
    color:@title-color;
    border-bottom: 4PX solid transparent;
    transition: all 0.25s;
    line-height: 16px;
    padding: 18px 0 15px 0;
    flex: 1;

    &--active {
      font-weight: 600;
      color:@label-color;
    }
    &:disabled {
      border-bottom: 2PX solid transparent;
      color: gray;
    }
  }
  &__active {
    &--line {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 4px;
      background-color: @button-blue;
      transition: transform 0.4s ease, width 0.4s ease;
    }
  }
}
</style>
