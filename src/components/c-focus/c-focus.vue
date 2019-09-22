<template>
  <ul :class="[bem(), className]">
    <li
      v-for="(item, index) in items"
      :key="index"
      :class="[{'active' : activeIndex === index}, liClass]"
      @click.prevent="clickHandle(item, index)"
    >
      <slot :item="item"></slot>
    </li>
  </ul>
</template>
<script>
import create from 'utils/create/basic'

export default create({
  name: 'focus',
  props: {
    className: String,
    items: Array,
    liClass: String
  },
  data () {
    return {
      activeIndex: ''
    }
  },
  mounted () {
    this.items.length && this.clickHandle(this.items[0], 0)
  },
  methods: {
    clickHandle (item, index) {
      this.activeIndex = index
      this.$emit('active-handle', item, index)
    }
  }
})
</script>

<style lang='less'>
.c-focus {
  background-color: @white;
  display: flex;
  flex-wrap: wrap;
  padding: 10px 10px;
  border-radius: 4px;
  justify-content: space-between;

  li {
    position: relative;
    width: 46%;
    margin: 3px 5px 3px 6px;
    padding: 15px 14px;
    border: 1px solid @default-border;
    background-color: @default-background;
    font-size: @f14;
    border-radius: 4px;
  }

  li.list{
    width: 100%;
    padding: 16px 20px 15px 30px;
    margin: 9px 0;
    font-size: @f16;
  }

  li.active {
    border: 1px solid @active-border;
    background-color: @active-background;

    &:after {
      position: absolute;
      content: "";
      right: 16px;
    }
  }
}
</style>
