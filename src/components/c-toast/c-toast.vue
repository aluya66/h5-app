<template>
  <div :class="[bem(), className]" v-if="curShow">
    <div :class="bem('alertBox')">
      <p :class="bem('alertBox--firstTitle')">{{contentObj.title}}</p>
      <p
        :class="[bem('alertBox--secondTitle'), !contentObj.leftTitle ? bem('alertBox--nobtn') : '']"
      >{{message || contentObj.msg}}</p>
      <p
        :class="[bem('alertBox--subTitle'), !contentObj.leftTitle ? bem('alertBox--nobtn') : '']"
       v-if="contentObj.subTitle">{{contentObj.subTitle}}</p>
      <div :class="bem('alertBox--btnBox')" v-if="contentObj.leftTitle">
        <button @click="leftClick">{{contentObj.leftTitle}}</button>
        <button @click="rightClick">{{contentObj.rightTitle}}</button>
      </div>
    </div>
  </div>
</template>
<script>
import create from 'utils/create/basic'

export default create({
  name: 'toast',
  props: {
    className: String,
    contentObj: {
      type: Object,
      default () {
        return {
          title: '',
          subTitle: '',
          msg: '',
          leftTitle: '',
          rightTitle: ''
        }
      }
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      message: '',
      isShow: false
    }
  },
  computed: {
    curShow () {
      return this.show ? this.show : this.isShow
    }
  },
  methods: {
    rightClick () {
      this.$emit('right-btn')
      this.isShow = false
      this.$emit('update:show')
    },
    leftClick () {
      this.$emit('left-btn')
    }
  }
})
</script>
<style lang='less' scoped>
.c-toast {
  position: fixed;
  width: 100%;
  height: 100%;
  background: @cover-background-color;
  top: 0;
  left: 0;
  &__alertBox {
    position: absolute;
    height: auto;
    margin: 0 2%;
    width: 90%;
    top: 30%;
    left: 48%;
    transform: translateX(-50%);
    z-index: 10000;
    background:rgba(248,248,248,1);
    border-radius: 4px;
    overflow: hidden;
    text-align: center;
    &--firstTitle {
      font-size: @f20;
      color: @text-black;
      padding: 26px 0 16px 0;
      font-weight: bold;
      background: @default-background;
    }
    &--secondTitle {
      font-size: @f18;
      color: @text-black;
      padding: 21px 0 11px 0;
      font-weight: 500;
    }
    &--subTitle{
      font-size: @f16;
      color: @title-color;
    }
    &--nobtn {
      padding-bottom: 30px;
    }
    &--btnBox {
      width: 100;
      margin-top: 20px;
      box-sizing: border-box;
      border-top: 1px solid @opacity-border-color;
      button {
        width: 50%;
        height: 100%;
        padding: 18px 0;
        color: @button-color;
        font-size: @f16;
        font-weight: 600;
        background: none;
        border: none;
      }
      button:nth-child(1) {
        border-right: 1px solid @opacity-border-color;
        color: @title-color;
        font-weight: 500;
      }
    }
  }
}
</style>
