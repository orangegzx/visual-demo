/*
 * @Author: gezuxia
 * @Descripttion:
 * @Date: 2020-12-10 15:28:06
 * @LastEditors: gezuxia
 * @LastEditTime: 2020-12-11 12:33:01
 */
import _ from 'lodash'

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

/** 1.1 查询数组重复值的索引们---去重的同事，查看重复值的所用
 *  查询起终点（起终点对应的id所属来源都已处理好）的来源一致的重复数据的索引：多个/一个
*/
export function getSameSTLineIndex(arr) {
  const same_data_arr = []
  for (var i = 0; i < arr.length; i++) {
    // 从存储相同数据的数组中查询是否已存在相同的值，存在相同值时，则放入对应的数据中，否则push新的值到same_data_arr中
    const index = same_data_arr.find(function(x) {
      return x.source === arr[i].source && x.target === arr[i].target // 根据新数组中的source查询是否相同值
    })

    if (index !== undefined && index.indexes !== undefined) {
      // 从新数组中查询到相同值时，添加相同值的索引
      same_data_arr.find(function(x) {
        if (x.source === arr[i].source && x.target === arr[i].target) {
          x.indexes.push(i)
        }
      })
    } else {
      // 如果find不到相同放入arr中，如第一次查a时index为undefined，直接dang
      // source,target 都为第一次值时的数据
      same_data_arr.push({
        id: `${arr[i].source}_${arr[i].target}`,
        source: arr[i].source,
        target: arr[i].target,
        indexes: [i]
      })
    }
  }
  return same_data_arr
}

/**
 * 1.2 流量等数据的合并计算
 * 数据的相同type时，二者rate相加,平均速率求平均值
 * @param arr 需要合并的多条线的traffics字段数据的集合
 * 1，先全部求和，再进行筛选出平均率计算平均值
 *  */
export function getRateSum(arr) {
  // 1.全部求和
  const result = Object.values(arr.reduce((acc, { type, protocol, direction, rate }) => {
    acc[type] = {
      type,
      protocol,
      direction,
      rate: (acc[type] ? acc[type].rate : 0) + rate
    }
    return acc
  }, {}))
  // 2.平均率：求平均值
  result.map(item => {
    if (item.type === 'avg_latency') {
      item.rate = item.rate ? item.rate / 2 : 0
    }
  })
  return result
}

// 1 计算全部压缩后的线条的流量（已处理线起点和终点的节点是否是需要压缩）
export function getSameLineRate(egesList) {
  // 计算需要合并的线条
  const new_line_arr = this.getSameSTLineIndex(egesList)
  console.log('same_line_Arr', new_line_arr)
  // 对有相同起终点的线条进行流量的合并: 子节点的同来源的起终点最多有4条线
  new_line_arr.map((line) => {
    if (line.indexes.length > 1) {
      // 1.合并多条线的流量计算
      const arr_list = []
      line.indexes.map(i => {
        arr_list.push(...egesList[i].traffics)
        console.log(1, '合并line', line.source, line.target, i)
      })
      const result = this.getRateSum(arr_list)
      line.traffics = result
      console.log('result', result)
    } else {
      // 2. 单条线，流量等数据不变
      line.traffics = egesList[line.indexes[0]].traffics
      console.log(0, '单线条', line.source, line.target, line.indexes[0], egesList[line.indexes[0]].traffics)
    }
  })
  console.log('new-line', new_line_arr)
  return new_line_arr
}

/** 压缩数据
 * @param {Object} originData 版本级别的数据，即全解压的数据，包节点eges、连线nodes
 * @param {Array} unZipNode 不需压缩的服务节点，即解压的节点，数据格式为全部压缩后的数据格式，默认全部压缩
 */
export function zipData(originData, unZipNode = []) {
  // console.log(variableType('aaa'), originData, unZipNode)
  if (variableType(originData) !== 'object' || !originData) return {}
  if (variableType(unZipNode) !== 'array') return []
  const result = {}
  if (unZipNode.length === 0) {
    // 1.全压缩
    // 1.1 节点压缩
    if (originData.sameOriginNodes) {
      console.log('全压缩-节点', originData.sameOriginNodes)
      const new_node_list = []
      // 遍历所有相同来源的版本节点，判断服务级别是单节点还是多节点
      Object.values(originData.sameOriginNodes).map((node_list) => {
        if (Array.isArray(node_list) && node_list.length > 1) {
          // 1.多版本
          const traffics_arr = []
          const n = {}
          /** 遍历同源的所有节点，合并节点的流量的数据
           * 合并同来源的版本节点为服务节点: node id =》服务级别id，verson置空
           *  */
          node_list.map(node => {
            traffics_arr.push(...node.traffics)
            node.id = `${node.namespace}/${node.name}`
            node.version = ''
            node.traffics = [] // 置空流量
            _.assign(n, node)
          })
          n.traffics = getRateSum(traffics_arr) // 合并流量
          new_node_list.push(n)
        } else {
          // 2.单版本：所有属性不变，id还是版本id
          new_node_list.push(node_list[0])
        }
      })
      result.nodes = new_node_list
      console.log('result', result)
    }
  } else if (unZipNode.length !== 0) {
    console.log(0)
    // 部分压缩
  } else {
    console.log('01')
    // 全解压
  }
  return result
}
