/* eslint-disable import/named */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import {
  Toast,
  Lazyload
} from 'components'

const components = [
  Toast,
  Lazyload
]

export default (Vue) => {
  components.forEach((Component) => {
    Vue.use(Component)
  })
  Vue.prototype.$debug = Vue.config.devtools
  Vue.prototype.$defaultImg = require('images/Rectangle@2x.png')
}
