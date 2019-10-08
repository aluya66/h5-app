export default {
  methods: {
    /**
     * 路由跳转，支持push、replace，location
     * @param {*} to
     * @param {*} replace
     * @param {*} url
     */
    routerLink (to, replace, url) {
      const {
        $router
      } = this
      if (to && $router) {
        $router[replace ? 'replace' : 'push'](to)
      } else if (url) {
        replace ? location.replace(url) : (location.href = url)
      }
    },

    /**
     * 路由打开新窗口
     * 还可以通过<router-link target="_blank" 和 <a target="_blank"这两种方式开新窗口
     */
    openNewWin (routerOpts) {
      const {
        $router
      } = this
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
    },

    /**
     *  统一消息提示
     *
     * @param {string} [message=''] 消息
     * @param {string} [type='warning'] 类型，error，warning，info
     */
    messageTip (msg = '', type = 'warning', time = 1500) {
      let message = {}
      if (typeof msg === 'string') {
        message.msg = ''
        message.name = msg
      } else {
        message = msg
      }
      this.$message({
        message: message.name,
        type,
        duration: time
      })
    },
    /**
     *  统一跳转到登陆页面
     */
    goToLogin (time = 1.5, type = 'push') {
      setTimeout(() => {
        this.$router[type]({
          path: `/login?redirect=${this.$route.fullPath}`
        })
      }, time * 1000)
    }
  }
}
