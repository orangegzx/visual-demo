/*
 * @Author: gezuxia
 * @Descripttion:
 * @Date: 2020-12-10 15:28:06
 * @LastEditors: gezuxia
 * @LastEditTime: 2020-12-11 11:14:36
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
    ['[object Map]', 'map'],
    ['[object JSON]', 'json'],
    ['[object Math]', 'math'],
    ['default', 'other object']
  ])
  return map_data.get(v_data) ? map_data.get(v_data) : map_data.get('default')
}

// 节点对应服务级别关系
export function getNodeSoure(mapData, nodeId) {
  if (variableType(mapData) !== 'map') return
  return mapData.get(nodeId) ? mapData.get(nodeId) : mapData.get('default')
}

/** 压缩数据
 * @param {Object} sourceData 版本级别的数据，即全解压的数据，包节点eges、连线nodes
 * @param {Array} unZipNode 不需压缩的服务节点，即解压的节点，数据格式为全部压缩后的数据格式，默认全部压缩
 */
export function zipData(sourceData, unZipNode = []) {
  console.log(variableType('aaa'), sourceData, unZipNode)
  if (variableType(sourceData) !== 'object') return {}
  if (variableType(unZipNode) !== 'array') return []
  if (unZipNode.length === 0) {
    // 全压缩
    console.log(1)
  } else if (unZipNode.length !== 0) {
    console.log(0)
    // 部分压缩
  } else {
    console.log('01')
    // 全解压
  }
}
