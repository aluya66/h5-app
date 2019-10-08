/**
 * 国际化翻译
 * @param {*} name 需要处理的i18n 的key值
 * @param {*} model key对应的对象
 */
export const translate = (name, model) => {
  const _context = window.globalVue
  const hasKey = model ? _context.$te(`${model}.${name}`) : _context.$te(name)

  if (hasKey) {
    const curVal = model ? _context.$t(`${model}.${name}`) : _context.$t(name)

    return curVal
  }
  return name
}

/**
 * 获取本地语言
 */
export const getCurrentUserLanguage = () => {
  const lang = 'zh-CN'
  return (
    lang ||
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    process.env.VUE_APP_defaultLanguage
  )
}
