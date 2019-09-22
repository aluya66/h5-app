<template>
  <div class="validate">
    <div class="pintu">
      <img
        v-if="verifyBackground"
        :src="'data:image/jpeg;base64,' + verifyBackground"
        class="img"
        id="verifyImg"
        @click="apendChild($event)"
        alt
      />
      <div class="lable" v-if="returnTrue === 'true'">
        <p>请依次点击 :</p>
        <img v-if="lableImg" :src="'data:image/jpeg;base64,' + lableImg" class="lableImg" alt />
      </div>
      <div class="lable error" v-if="returnTrue === 'error'">验证失败，请重试！</div>
      <div class="lable success" v-if="returnTrue === 'success'">验证成功</div>
      <div
        class="biaoji"
        v-for="(item, index) in coordinate"
        @click="uncheck(index)"
        :key="index"
        :style="'left:' +  item.width + 'px;top:' + item.height + 'px;'"
      >
        <img class="biaojiImg" src="@/assets/biaoji.png" alt />
        <p class="biaojiTitle">{{item.order}}</p>
      </div>
      <img src="@/assets/shuaxin.png" v-if="refreshs" @click="refresh" class="shuaxin" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'validate',
  props: {
    verifyBackground: {},
    lableImg: {},
    isvalid: {
      default: true
    }
  },
  data () {
    return {
      returnTrue: 'true',
      // lableImg: "",
      // background: "",
      coordinate: [], // 点击设置的坐标
      refreshs: true, // img刷新按钮

      firstPassFous: false,
      secondPassFous: false,
      authCodeFous: false,
      phoneFous: false,
      divThreeStr: '获取验证码',
      showStepOne: true,
      showStepTwo: false,
      showStepThree: false,
      account: '',
      verify: '--',
      colors: {}
    }
  },
  components: {},
  mounted () {
    console.log(this.lableImg)
  },
  methods: {
    apendChild (event) {
      // 添加标记
      console.log(this.isvalid)
      if (!this.isvalid) return false
      if (this.coordinate.length < 3) {
        var x = event.offsetX
        var y = event.offsetY
        let len = this.coordinate.length
        let obj = {
          order: len + 1,
          width: x,
          height: y
        }
        this.coordinate.push(obj)
        console.log(this.coordinate)
        if (this.coordinate.length >= 3) {
          this.$emit('returnData', this.coordinate)
          // this.validate(this.coordinate)
        }
      }
    },
    uncheck (index) {
      // 标记取消选中
      if (index + 1 === this.coordinate.length) {
        this.coordinate.splice(index, 1)
      }
    },
    refresh () {
      this.coordinate = []
    }
  }
}
</script>

<style scoped lang="less">
.pintu {
  width: 20rem;
  position: relative;
  margin-right: 0;
  .img {
    width: 100%;
  }
  .lable {
    border: 1px solid #ccc;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
    p {
      padding-left: 1rem;
    }
    .lableImg {
      // width: 8rem;
      height: 2.2rem;
      margin-left: 1rem;
    }
  }
  .error {
    border: 2px solid red;
    background: #ffcccc;
    // font-size: 1.2rem;
    text-align: center;
  }
  .success {
    border: 2px solid Turquoise;
    color: SeaGreen;
    background: LightCyan;
  }
  .shuaxin {
    position: absolute;
    width: 25px;
    height: 25px;
    right: 5px;
    top: 5px;
    cursor: pointer;
  }
  // float: right;
}
.biaoji {
  position: absolute;
  margin-top: -27px;
  margin-left: -16px;
  .biaojiImg {
    position: absolute;
  }
  .biaojiTitle {
    position: absolute;
    left: 0.85rem;
    top: -0.9rem;
    color: #fff;
    font-size: 1.2rem;
    font-weight: 600;
    z-index: 10;
  }
}
</style>
