/**
 * 统一异常处理
 *
 * @param {*} context vue上下文
 * @param {*} err 错误信息对象
 * @param {*} callback 异常处理回调函数
 * @returns null
 *
 *  (1041900511," 授权码code错误"),
    (1041900513," H5 token无效"),
    (1041900514," 授权码code过期"),
    (1042100504,"健康场景活动资格查询为空"),
    (1042100505,"健康场景活动资格查询失败---即没有活动资格"),
    (1042100506,"健康场景资格添加失败"),
    (1042100507,"健康场景资格删除失败"),
    (1042100513,"健康场景用户未进行职业认证"),
    (1042100514,"健康场景批量查询用户信息失败")
 */
export default (err, callBackFun, time) => {
  const errCode = err.code
  let errMsg = ''
  console.log('err', err)
  if (errCode === 111) {
    return
  }
  switch (errCode) {
    case 101:
      errMsg = '鑒權失敗'
      break
    case 102:
      errMsg = '服務異常，請稍後重試'
      break
    case 103:
      errMsg = '請求參數異常'
      break
    case 104:
      errMsg = '請求數據不存在'
      break
    case 105:
      errMsg = '狀態異常'
      break
    case 106:
      errMsg = '用戶狀態異常'
      break
    case 107:
      errMsg = '調用接口異常'
      break
    case 108:
      errMsg = '積分不足，您可選擇其他禮品兌換'
      break
    case 111:
      errMsg = '用戶狀態過期'
      break
    case 112:
      errMsg = '此礼品暂无库存，您可选择其他礼品兑换'
      break
    case 113:
      errMsg = '商品券不匹配'
      break
    case 114:
      errMsg = '商品券已過期'
      break
    case 1041900511:
      errMsg = '授權碼code錯誤'
      break
    case 1041900513:
      errMsg = 'H5 token無效'
      break
    case 1041900514:
      errMsg = '授權碼code過期'
      break
    case 1042100504:
      errMsg = '健康場景活動資格查詢為空'
      break
    case 1042100505:
      errMsg = '健康場景活動資格查詢失敗---即沒有活動資格'
      break
    case 1042100506:
      errMsg = '健康場景資格添加失敗'
      break
    case 1042100507:
      errMsg = '健康場景資格刪除失敗'
      break
    case 1042100513:
      errMsg = '查詢當前數據頁為空'
      break
    case 1042100514:
      errMsg = '健康場景用戶未進行職業認證'
      break
    case 1042100515:
      errMsg = '健康場景批量查詢用戶信息失敗'
      break
    default:
      errMsg = err.desc
      break
  }
  window.globalVue.$toast(`${errCode}【${errMsg}】`, time)
  // eslint-disable-next-line no-unused-expressions
  callBackFun && callBackFun(err)
}
