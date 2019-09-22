/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import { getStore } from 'utils'

const INIT_BUYCART = 'INIT_BUYCART'

/**
 * vuex的state
 */
const state = {
  cartList: [] // 加入购物车列表
}

/**
 * vuex的getters
 */
const getters = {
  cartList: state => state.cartList
}

/**
 * vuex中的mutations
 */
const mutations = {
  // 网页初始化时从本地缓存获取购物车数据
  [INIT_BUYCART] (state) {
    const initCart = getStore('buyCart')
    if (initCart) {
      state.cartList = JSON.parse(initCart)
    }
  }
}

/**
 * vuex中的actions
 */
const actions = {}

export default {
  state,
  getters,
  actions,
  mutations
}
