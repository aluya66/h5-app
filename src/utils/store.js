/**
 * 设置cookie
 *
 * @param {*} name
 * @param {*} value
 * @param {*} day
 */
export const setCookie = (name, value, day) => {
  const date = new Date()
  date.setDate(date.getDate() + day)
  document.cookie = `${name}=${value};expires=${date}`
}

/**
 * 获取cookie
 *
 * @param {*} name
 * @returns
 */

export const getCookie = name => {
  const reg = RegExp(`${name}=([^;]+)`)
  const arr = document.cookie.match(reg)
  if (arr) {
    return arr[1]
  }
  return ''
}

/**
 * 删除 cookie
 *
 * @param {*} name
 */
export const delCookie = name => {
  setCookie(name, null, -1)
}

/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return
  let value = localStorage.getItem(name)
  if (value && value.indexOf('{') >= 0) {
    value = JSON.parse(localStorage.getItem(name))
  }
  // eslint-disable-next-line consistent-return
  return value
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return
  localStorage.removeItem(name)
}

/**
 * 删除所有localStorage
 */
export const clearStore = () => {
  localStorage.clear()
}
