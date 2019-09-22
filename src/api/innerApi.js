import Http from '../utils/request'

const context = process.env.VUE_APP_serPath

/**
 * mock模拟数据 示例
 * @param {*} params params数据对象
 * @param {Object} mockFile 接口名称对应的mock数据文件
 */
export const mockList = params => Http.fetch(`${context}/mockList`, params, {
  mockFile: `list${params.type}`
})

/**
 * 【post】添加用户
 * @param {*} params params数据对象
 * @param {Object} mockFile 接口名称对应的mock数据文件
 * @exmple input params
 */
export const addUser = params => Http.fetch(`${context}/user/add`, params, {
  // mockFile: 'userIntegral'
})
