/**
 * Created by Wulnut on 21/2/1.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 验证登录着的姓名
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  // trim 方法用于删除字符串的头尾空白符，空白符包括：空格、制表符 tab、换行符等其他空白符等
  return valid_map.indexOf(str.trim()) >= 0
}
