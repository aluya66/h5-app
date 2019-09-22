export default {
  isDebug: process.env.NODE_ENV === 'development'
}

/**
 * 下载附件
 * @param {*} url '/xxx'
 * @param {*} param {key: value}
 */
export const donwFile = (url, param) => {
  window.open(
    `${window.globalVue.$filePath}${
      process.env.VUE_APP_serverPath
    }${url}?${serializeParam(param)}`
  )
}

/**
 * 路由跳转，支持push、replace，location
 * @param {*} to
 * @param {*} replace
 * @param {*} url
 */
export const routerLink = (to, replace, url) => {
  const { $router } = window.globalVue
  if (to && $router) {
    $router[replace ? 'replace' : 'push'](to)
  } else if (url) {
    replace ? location.replace(url) : (location.href = url)
  }
}

/**
 * 路由打开新窗口
 * 还可以通过<router-link target="_blank" 和 <a target="_blank"这两种方式开新窗口
 */
export const openNewWin = routerOpts => {
  const { $router } = window.globalVue
  let routePath = ''
  if (routerOpts.url) {
    routePath = routerOpts.url
  } else {
    routePath = $router.resolve({
      name: routerOpts.name,
      query: routerOpts.query,
      params: routerOpts.params
    })
  }
  window.open(routePath, '_blank')
}

/**
 *  统一消息提示
 *
 * @param {string} [message=''] 消息
 * @param {string} [type='warning'] 类型，error，warning，info
 */
export const messageTip = (msg = '', type = 'warning', time = 1500) => {
  let message = {}
  if (typeof msg === 'string') {
    message.msg = ''
    message.name = msg
  } else {
    message = msg
  }
  window.globalVue.$message({
    message: message.name,
    type,
    duration: time
  })
}

/**
 *  统一跳转到登陆页面
 */
export const goToLogin = (time = 1.5, type = 'push') => {
  setTimeout(() => {
    window.globalVue.$router[type]({
      path: `/login?redirect=${window.globalVue.$route.fullPath}`
    })
  }, time * 1000)
}

/**
 * 改为驼峰命名
 * @param {*} str
 */
export const camelize = str => str.replace(/-(\w)/g, (_, c) => c.toUpperCase())

export const objectMerge = (target, source) => {
  /* Merges two  objects,
  giving the last one precedence */

  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

/**
 * 防抖
 * @param {*} fn
 * @param {*} delay
 */
export const debounce = (fn, delay) => {
  // eslint-disable-next-line no-undef
  let args = arguments
  let context = this
  let timer = null

  return function () {
    if (timer) {
      clearTimeout(timer)

      timer = setTimeout(function () {
        fn.apply(context, args)
      }, delay)
    } else {
      timer = setTimeout(function () {
        fn.apply(context, args)
      }, delay)
    }
  }
}
/**
 *  节流
 * @param {*} fn
 * @param {*} delay
 */
export const throttle = (fn, delay) => {
  // eslint-disable-next-line no-undef
  let args = arguments
  let context = this
  let timer = null
  let remaining = 0
  let previous = new Date()

  return function () {
    let now = new Date()
    remaining = now - previous

    if (remaining >= delay) {
      if (timer) {
        clearTimeout(timer)
      }

      fn.apply(context, args)
      previous = now
    } else {
      if (!timer) {
        timer = setTimeout(function () {
          fn.apply(context, args)
          previous = new Date()
        }, delay - remaining)
      }
    }
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 */
export const deepClone = source => {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 *  将object参数，转换成以kv形式拼接，主要用于Content-Type === 'application/x-www-form-urlencoded'时
 *
 * @param {*} [params={}]
 * @example
 *  params:{
 *    id: 12313,
 *    name: xxx
 *  }
 * @returns id=12313&name=xxx
 * 当以'/'分割时，/12313/xxx
 */
export const serializeParam = (params = {}, split = '&') => {
  let paramsStr = '' // 数据拼接字符串
  Object.keys(params).forEach(key => {
    if (split === '&') {
      paramsStr += `${key}=${params[key]}${split}`
    } else if (split === '/') {
      paramsStr += `${params[key]}${split}`
    }
  })

  if (paramsStr !== '') {
    return paramsStr.substr(0, paramsStr.lastIndexOf(`${split}`))
  }
  return paramsStr
}

/**
 * 截取url指定参数值
 *
 * @param {*} name
 * @returns
 * @ example
 *  url：http://wwww.jb51.net/?q=js
 *
 *  getUrlParam(q) => js
 */
export const getUrlParam = name => {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`)
  const curStr = window.location.href.split('?')
  let r = ''
  if (curStr[1]) {
    r = curStr[1].match(reg) // search,查询？后面的参数，并匹配正则
    if (r !== null) return unescape(r[2])
  }
  return r
}

/**
 * 掩码字符串，中英文同时支持
 *
 * @param {*} str 字符串
 * @param {*} n   截取的长度
 *  碰到空格、逗号截止，后面的直接*，带上*最长7个字符
 */
export const splitStr = (str, n = 6) => {
  if (!str) return
  let splitArr = ''
  if (str.indexOf(',') !== -1) {
    splitArr = str.split(',')[0]
  } else if (str.indexOf('，') !== -1) {
    splitArr = str.split('，')[0]
  } else {
    splitArr = str.split(' ')[0]
  }
  // eslint-disable-next-line no-control-regex
  const reg = /[^\x00-\xff]/g
  if (str.replace(reg, '**').length > n) {
    splitArr = `${splitArr}*`
  }
  if (splitArr.replace(reg, '**').length <= n) {
    return splitArr
  }
  const m = Math.floor(n / 2)
  for (let i = m; i < splitArr.length; i++) {
    if (splitArr.substr(0, i).replace(reg, '**').length >= n) {
      return `${splitArr.substr(0, i)}*`
    }
  }
  return splitArr
}

export function param (json) {
  if (!json) return ''
  // eslint-disable-next-line no-undef
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

export const isExternal = path => {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export const isString = str => {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

/**
 * 判断是否为数字
 * @param {*} arg
 */
export const isArray = arg => {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

export const html2Text = val => {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

/**
 * 数组去重
 * @param {*} arr
 */
export const uniqueArr = arr => Array.from(new Set(arr))

/**
 * 合并数组后取数组值交际
 */
export const removeRepeatByFilter = array =>
  array.filter((item, index) => array.indexOf(item) === index)

/**
 * 随机数
 */
export const createUniqueString = (num = 10) => {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 123)
  return (+(randomNum + timestamp)).toString(num)
}

/**
 * 获取随机16位数字
 */
export const getRandomNum = () => `${Math.random()}`.split('.')[1].substr(0, 16)
