/* eslint-disable no-param-reassign */
import CToast from 'components/c-toast'

const Toast = {}

// 注册Toast
// eslint-disable-next-line func-names
Toast.install = function (Vue) {
  const ToastConstructor = Vue.extend(CToast)
  const instance = new ToastConstructor()

  instance.$mount(document.createElement('div'))
  document.body.appendChild(instance.$el)

  Vue.prototype.$toast = (msg, duration = 2000) => {
    instance.message = msg
    instance.isShow = true

    setTimeout(() => {
      instance.isShow = false
    }, duration)
  }
}

export default Toast
