/*
 * @Author: gezuxia
 * @Descripttion:
 * @Date: 2020-12-10 15:28:06
 * @LastEditors: gezuxia
 * @LastEditTime: 2020-12-10 15:38:18
 */

// 判断变量类型
export function variableType(v) {
  const v_data = Object.prototype.toString.call(v)
  const map_data = new Map([
    ['[object String]', 'string'],
    ['[object Number]', 'number'],
    ['[object Boolean]', 'boolean'],
    ['[object Undefined]', 'undefined'],
    ['[object Object]', 'object'],
    ['[object Array]', 'array'],
    ['[object Null]', 'null'],
    ['[object RegExp]', 'RegExp'],
    ['[object Symbol]', 'symbol'],
    ['[object JSON]', 'json'],
    ['[object Math]', 'math'],
    ['default', 'other object']
  ])
  return map_data.get(v_data) ? map_data.get(v_data) : map_data.get('default')
}

/** 压缩数据
 * @param {Array} unZipNode 不需压缩的服务节点，即解压的节点，数据格式为全部压缩后的数据格式，默认全部压缩
 * @param {Object} sourceData 版本级别的数据，即全解压的数据，包节点eges、连线nodes
 */
export function zipData(unZipNode = [], sourceData) {
  console.log(variableType('aaa'))
  // if (this.variableType(data) !=='obejct') return {}
  // if (this.variableType(unZipNode) !=='array') return []
  return 1
}
