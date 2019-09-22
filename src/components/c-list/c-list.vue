<template>
  <ul :class="[bem(), className]">
    <li
      v-for="(item, index) in listItems"
      :key="index"
      :class="className"
      @click="clickHandle(item, index)"
    >
      <slot :item="item"></slot>
    </li>
  </ul>
</template>
<script>
import create from 'utils/create/basic'

export default create({
  name: 'list',
  props: {
    className: String,
    listItems: Array
  },
  methods: {
    clickHandle (item, index) {
      this.$emit('activeHandle', item, index)
    }
  }
})
</script>

<style lang='less'>
.c-list {
  background-color: @white;
  padding: 9px 11px 9px 16px;
  border-radius: 4px;
  &.box{
    background-color: transparent;
    margin: 0px 12px;
    padding:0;
  }
  &.panel{
    background-color: transparent;
    padding:0;
  }
  li {
    width: 100%;
    line-height: 50px;
    position: relative;
    color: @title-color;
    border-bottom: 1PX solid @default-border;
    font-size: @f14;
    display: flex;
  }
  li.box {
    border-bottom: none;
    margin: 12px 0px;
    line-height: 20px;
    padding: 17px 20px 15px 20px;
    background-color: @white;
    border-radius: 4px;
    justify-content: space-between
  }
  li.panel{
    border-bottom: none;
    margin: 12px 0px;
    line-height: 20px;
    padding: 17px 14px 15px 20px;
    background-color: @white;
    border-radius: 4px;
    justify-content: space-between
  }
  li:last-child{
    border-bottom: none;
  }
}
</style>
