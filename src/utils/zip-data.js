/*
 * @Author: gezuxia
 * @Descripttion:
 * @Date: 2020-12-10 15:28:06
 * @LastEditors: gezuxia
 * @LastEditTime: 2020-12-14 11:28:05
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

/** 流量的合并计算
 * @param {Array} arr 多条线的traffics字段数据的集合
 * desc：数据的相同type时，二者rate相加,平均速率求平均值
 *      先全部求和，再进行筛选出平均率计算平均值
 */
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

/** 1.1 查询数组重复值的索引们---去重同时，查看重复值的索引
 *  查询起终点（起终点对应的id所属来源都已处理好）的来源一致的重复数据的索引：多个/一个
*/
export function getSameSTLineIndex(arr) {
  const same_data_arr = []
  console.log('aarr0', arr)
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
      // 如果find不到相同放入arr中，如第一次查a时index为undefined
      // source,target 都为第一次值时的数据
      same_data_arr.push({
        source: arr[i].source, // 新的连线
        target: arr[i].target,
        // oldSource: arr[i].oldSource, // 原连线
        // oldTarget: arr[i].oldTarget,
        sourceOrigin: arr[i].sourceOrigin, // 服务级别的来源
        targetOrigin: arr[i].targetOrigin,
        indexes: [i], // 重复的连线的索引集合
        traffics: [] // 去重的流量置空 重新计算
      })
    }
  }
  return same_data_arr
}

/** 全压缩-线条合并: 包括线条的去重、流量计算
 * @param {Array} egesList 已处理的线条，即来源相同，终点相同的线
 */
export function getSameLineRate(egesList) {
  // 去重连线
  console.log('去重前：', egesList)
  console.log('去重后的线条', getSameSTLineIndex(egesList))
  const new_line_arr = getSameSTLineIndex(egesList)
  console.log('去重&&流量后线条', new_line_arr)
  // 对有相同起终点的线条进行流量的合并: 子节点的同来源的起终点最多有4条线
  new_line_arr.map((line) => {
    const children_line = []
    if (line.indexes.length > 1) {
      // 1.合并多条线的流量计算
      const arr_list = []
      line.indexes.map(i => {
        arr_list.push(...egesList[i].traffics)
        console.log(1, '合并line', egesList, line.source, line.target, i)
        children_line.push({
          source: egesList[i].oldSource,
          target: egesList[i].oldTarget,
          traffics: egesList[i].traffics
        })
      })
      const result = getRateSum(arr_list)
      line.traffics = result
    } else if (line.indexes.length === 1) {
      // 2. 单条线，流量等数据不变
      line.traffics = egesList[line.indexes[0]].traffics
      console.log(0, '单线条', line.source, line.target, line.indexes[0], egesList[line.indexes[0]].traffics)
      children_line.push({
        source: egesList[line.indexes[0]].oldSource,
        target: egesList[line.indexes[0]].oldTarget,
        traffics: egesList[line.indexes[0]].traffics
      })
    }
    line.children = children_line
    return line
  })
  console.log('new-line', new_line_arr)
  return new_line_arr
}

/** 压缩数据
 * @param {Object} originData 版本级别的数据，即全解压的数据，包节点eges、连线nodes
 * @param {Array} unZipNode 不需压缩的服务节点，即解压的节点，数据格式为全部压缩后的数据格式，默认全部压缩
 */
export function zipData(originData, unZipNode = []) {
  const origin_data = _.cloneDeep(originData) // 深拷贝问题
  if (variableType(origin_data) !== 'object' || !origin_data) return {}
  if (variableType(unZipNode) !== 'array') return []
  const result = {}

  if (unZipNode.length === 0) {
    /** 1.全压缩 */
    // 1.1 节点压缩，单版本作为一个节点，多版本：使用服务级别节点
    if (origin_data.sameOriginNodes) {
      const new_node_list = []
      // 遍历所有相同来源的版本节点，判断服务级别是单节点还是多节点
      Object.values(origin_data.sameOriginNodes).map((node_list) => {
        if (Array.isArray(node_list) && node_list.length > 1) {
          // 1.多版本
          /** 计算节点合并流量
           * 遍历同源的所有节点，合并节点的流量的数据
           *  */
          const traffics_arr = []
          node_list.map(node => {
            traffics_arr.push(...node.traffics)
          })
          const node_traffics = getRateSum(traffics_arr) // 合并流量
          // 根据alias取唯一,作为父节点。合并同来源的版本节点为服务节点
          let serve_n = {}
          serve_n = _.cloneDeep(node_list[0])
          serve_n.versionList = node_list
          serve_n.traffics = []
          serve_n.id = serve_n.alias
          serve_n.version = ''
          serve_n.traffics = node_traffics
          new_node_list.push(serve_n)
        } else {
          // 2.单版本：所有属性不变，id还是版本id
          new_node_list.push(node_list[0])
        }
      })
      result.nodes = new_node_list
    } else {
      return
    }

    // 1.2 line处理: 起点和终点对应的节点是否压缩来对线条合并
    if (origin_data.edges) {
      let new_edges_list = []
      new_edges_list = origin_data.edges.map((line) => {
        /** 起点
         * 判断起点的来源是单节点 or 有子节点的节点，即服务级别的id是否有多个节点，当前节点是单节点还是子节点
         * 子节点：线起点: 起点服务级别id
         * 单节点：不变
         *  */
        line.oldSource = line.source // 标记原连线
        line.oldTarget = line.target
        if (origin_data.sameOriginNodes[line.sourceOrigin].length > 1) {
          // 多节点的服务节点
          line.source = line.sourceOrigin
        } else if (origin_data.sameOriginNodes[line.sourceOrigin].length === 1) {
          // 单节点
        }

        /** 终点 */
        if (origin_data.sameOriginNodes[line.targetOrigin].length > 1) {
          // 多节点的服务节点
          line.target = line.targetOrigin
        } else if (origin_data.sameOriginNodes[line.targetOrigin].length === 1) {
          // 单节点
        }

        return line
      })
      // 去重 && 线流量处理
      result.edges = getSameLineRate(new_edges_list)
    } else {
      console.log('0')
      return
    }
    console.log('去重后line', result)
    /** */
  } else if (unZipNode.length !== 0) {
    console.log(0)
    // 部分压缩
  } else {
    console.log('01')
    // 全解压
  }
  return result
}
