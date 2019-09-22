/* eslint-disable quote-props */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import axios from 'axios'
import env, {
  serializeParam
  // getRandomNum
} from 'utils'

import {
  getStore,
  setStore
} from 'utils/store'
// import {
//   getCurrentUserLanguage
// } from 'utils/i18n'

import errFun from 'utils/err'

// import {
//   getAuth
//   getSign,
//   getAppKey
// } from 'utils/encrypt'

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
}

let cancel
const promiseArr = {}
// const CancelToken = axios.CancelToken;
// const lang = getCurrentUserLanguage()
const instance = axios.create({
  baseURL: '', // !env.isDebug ? process.env.VUE_APP_serverUrl : '',
  timeout: 10000
})

instance.interceptors.request.use((config) => {
  const arrFlag = `${config.url}?${JSON.stringify(config.data)}`
  // 重复请求取消操作
  if (promiseArr[arrFlag]) {
    promiseArr[arrFlag]('_CACHE_')
    promiseArr[arrFlag] = cancel
  } else {
    promiseArr[arrFlag] = cancel
  }
  // 当loading为false时，不需要全局loading效果
  if (config.customConfig.loading) {
    // loadingInstace = null;
    // window.globalVue.$toast({
    //   mask: true,
    //   message: '加载中...'
    // });
    // loadingInstace = window.globalVue.$loading({
    //   fullscreen: true
    // });
  }
  return config
}, err => Promise.reject(err))

// 拦截返回的信息，做统一异常处理
instance.interceptors.response.use((response) => {
  const {
    data
  } = response
  if (data.code === 100 || data.retcode === 0) {
    // 正常返回数据，指返回data;
    return response.data
  }
  // 异常返回数据，返回
  if (!promiseArr.isGlobalErr) {
    errFun(data)
  }
  return data
})

/**
 * 开发debug下，mock模拟数据
 * @param {*} mockFile 请求接口名称
 * @returns
 */
const setProxy = mockFile => `/mock/${mockFile}`

/**
 *  加工请求参数，默认post
 *
 * @param {*} url 接口地址
 * @param {*} [param={}] 接口参数
 * @param {*} [opt={
 *  method : 'get' //以get方式请求，默认为post
 *  cache : '缓存名' //接口数据需要缓存时配置，默认不缓存
 *  token : 是否传入token，默认取本地存储
 * }]
 * @returns axios params
 */
const setParams = (url, param = {}, opt = {}) => {
  promiseArr.isGlobalErr = !!opt.hasErrMsg
  // 所有接口统一参数
  // param = { // ff80808169dbebfc0169fff1f4e2000b
  //   uid: getStore(
  //     'uid'), // || 'C30E3162A04F4A03BD5C8536C817B84D', // 'C30E3162A04F4A03BD5C8536C817B84D', // || '1E25EF55B1F24BB9B1AF6BAC8DBA47F5',
  //   ...param
  // }
  // // token统一配置，支持传入
  // if (opt.token) {
  //   param = {
  //     token: opt.token,
  //     ...param
  //   };
  // }
  // 请求个性化配置
  instance.defaults.customConfig = {
    loading: true,
    ...opt
  }

  // 开发阶段本地mock数据时，以get请求本地文件
  if (opt.mockFile && env.isDebug) {
    opt.method = 'get'
    url = setProxy(opt.mockFile)
  }
  let curParams = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      // Authorization,
      // timestamp,
      // nonce
    }
  }
  // }
  // get请求和post请求数据区分
  if (opt.method === 'get') {
    curParams = {
      params: !opt.norSplit ? param : serializeParam(param, opt.norSplit), // axios 默认params 为{}，特殊情况时格式化为&链接
      method: opt.method,
      // responseType: 'arraybuffer',
      ...curParams
    }
  } else {
    curParams.headers = {
      ...headers,
      ...curParams.headers,
      ...opt.headers
    }
    if (curParams.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      curParams.data = serializeParam(param)
    } else {
      curParams.data = param
    }
  }
  // 请求参数
  return {
    method: 'post',
    url,
    // cancelToken: new CancelToken((c) => {
    //   cancel = c;
    // }),
    ...curParams
  }
}

export default {
  /**
   * 同时支持get和post请求
   *
   * @param {*} url 接口地址
   * @param {*} [param={}] 接口参数
   * @param {*} [opt={
   *  type : true, //将params参数以key/value形式拼接,method为get时生效
   *  method : 'get' //以get方式请求，默认为post
   *  cache : '缓存名' //接口数据需要缓存时配置，默认不缓存
   * }]
   * @returns prmoise对象
   */
  fetch (url, param = {}, opt = {}) {
    const opts = setParams(url, param, opt)
    return new Promise((resolve, reject) => {
      // 判断是否需要缓存
      if (opt.cache && getStore(opt.cache)) {
        resolve(getStore(opt.cache))
      } else {
        instance(opts).then((res) => {
          if (res.code !== 100 && res.retcode !== 0) {
            if (opt.hasErrMsg) {
              resolve(res)
            } else {
              reject(res.desc || res.retmsg)
            }
          } else {
            opt.cache && setStore(opt.cache, res.data || res)
            resolve(opt.hasErrMsg ? res : res.data)
          }
        }).catch((error) => {
          reject(error)
        })
      }
    })
  }
}
