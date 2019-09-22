<template>
  <div :class="[bem(), className]">
    <div :class="bem('box')" v-for="(item, index) in resData" :key="index" @click="goToList(item)">
      <img :src="item.picUrl" />
      <p>{{item.title}}</p>
    </div>
  </div>
</template>

<script>
import create from 'utils/create/basic'

export default create({
  name: 'nav',
  props: {
    resData: Array,
    className: String,
    isSpecial: Boolean
  },
  methods: {
    goToList (item) {
      if (this.isSpecial) {
        this.$router.push(`/curseList/${item.pId}/${item.cId}`)
      } else {
        this.$emit('emitNavEvent', item)
      }
    }
  }
})
</script>

<style lang='less'>
.c-nav {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 10px 5px 10px 5px;
  background-color: @background-color;

  &__box {
    width: 25%;
    text-align: center;
    flex-direction: column;
    margin-top: 10px;
    img {
      width: 44px;
      height: 44px;
      display: inline-block;
    }
    p {
      margin-top: 8px;
      font-size: 12px;
      padding:0 5px;
      line-height: 17px;
      .ellipsis();
    }
  }
}
</style>
