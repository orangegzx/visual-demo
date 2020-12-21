/*
 * @Author: gezuxia
 * @Descripttion:
 * @Date: 2020-12-10 15:28:06
 * @LastEditors: gezuxia
 * @LastEditTime: 2020-12-21 18:07:54
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

/** 去除数组中空对象 */
export function removeArrEmptyObj(arr) {
  const list = arr
  if (!Array.isArray(list)) return arr
  const new_arr = arr.filter(item => Object.keys(item).length !== 0)
  return new_arr
}
/** 判断是否数组是否为数组 && 数组是否不是空数组 */
export function isArrNotEmpty(arr) {
  if (Array.isArray(arr)) return true
  if (Array.isArray(arr) && arr.length) return true
  return false
}

/** 按照key进行升(降)序 */
export function sortByKey(key) {
  return (a, b) => {
    const v1 = a[key]
    const v2 = b[key]
    return v1 - v2 // 从小到大
    // return v2 - v1 // 从大到小
  }
}

/** 流量的合并计算
 * @param {Array} arr 多条线的traffics字段数据的集合
 * desc：数据的相同type时，二者rate相加,平均速率求平均值
 *      先全部求和，再进行筛选出平均率计算平均值
 */
export function getRateSum(arr) {
  if (!isArrNotEmpty(arr)) return 0
  // 1.全部求和
  const keys = Object.keys(arr)
  const count = keys.length / 3 // 3个type，共几组
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
      item.rate = item.rate ? item.rate / count : 0
    }
  })
  return result
}

/** 1.1 查询数组重复值的索引们---去重同时，查看重复值的索引
 *  查询起终点（起终点对应的id所属来源都已处理好）的来源一致的重复数据的索引：多个/一个
*/
export function getSameSTLineIndex(arr) {
  if (!isArrNotEmpty(arr)) return arr
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
      // 如果find不到相同放入arr中，如第一次查a时index为undefined，source,target 都为第一次值时的数据
      same_data_arr.push({
        source: arr[i].source, // 新的连线
        target: arr[i].target,
        // oldSource: arr[i].oldSource, // 原连线,多条线一样时，oldsource无效，如v1-v3与v1-v4合并时，合成线的oldcource取？（默认第一个）
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
 * {
 * source、target: 起终点---已经过处理，如全压缩已处理：b/v1=> b
 * originsSource,originsTarget：对source和target的serviceNode来源，如b
 * oldSource、oldTarget：未处理的source、target，如b/v1
 * }
 */
export function mergeLine(egesList) {
  if (!isArrNotEmpty(egesList)) return egesList
  console.log('1去重前：', egesList)
  // 去重连线
  const deduplication_line = getSameSTLineIndex(egesList)
  console.log('2去重后线条', deduplication_line)
  // 对有相同起终点的线条进行流量的合并: 子节点的同来源的起终点最多有4条线
  let new_line_arr = deduplication_line.map((line) => {
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
  console.log('3去重&&流量后line', new_line_arr)
  new_line_arr = new_line_arr.filter(line => delete line.indexes) // 删除indexes属性
  return new_line_arr
}

/** 全压缩数据
 * @param {Object} originData 版本级别的数据，即全解压的数据，包节点eges、连线nodes
 * originData:{ edges,nodes,sameOriginNodes}, 必须的key
 * @param {Array} unZipNode 不需压缩的服务节点，即解压的节点，数据格式为全部压缩后的数据格式，默认全部压缩
 */
export function zipAllData(originData) {
  console.log('zipall params:', originData)
  const origin_data = _.cloneDeep(originData) // 深拷贝问题
  if (variableType(origin_data) !== 'object' || !origin_data) return {}
  const result = {}

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
        serve_n = _.cloneDeep(node_list[0]) // 主要提取所有字段
        serve_n.versionList = node_list
        serve_n.traffics = []
        serve_n.id = serve_n.serviceNode
        serve_n.version = ''
        serve_n.traffics = node_traffics
        new_node_list.push(serve_n)
      } else if (Array.isArray(node_list) && node_list.length === 1) {
        // 2.单版本：所有属性不变，id还是版本id
        node_list[0].versionList = []
        new_node_list.push(node_list[0])
      } else {
        console.log('全部压缩-节点数据为空')
      }
    })
    result.nodes = new_node_list
  } else {
    return origin_data
  }

  // 1.2 line处理: 起点和终点对应的节点是否压缩来对线条合并
  if (origin_data.edges) {
    let new_edges_list = []
    new_edges_list = origin_data.edges.map((line) => {
      /** 1.2-1 判断 起点 | 终点 对应节点是单节点 or 子节点
       * 子节点：线起点: 起点服务级别id
       * 单节点：不变
       *  */
      line.oldSource = line.source // 标记原连线
      line.oldTarget = line.target
      if (origin_data.sameOriginNodes[line.sourceOrigin].length > 1) {
        // 多节点的服务节点
        line.source = line.sourceOrigin
      } else if (origin_data.sameOriginNodes[line.sourceOrigin].length === 1) {
        // 单节点-不做处理
      }

      /** 终点 */
      if (origin_data.sameOriginNodes[line.targetOrigin].length > 1) {
        // 多节点的服务节点
        line.target = line.targetOrigin
      } else if (origin_data.sameOriginNodes[line.targetOrigin].length === 1) {
        // 单节点-不作处理
      }

      return line
    })
    // 1.2-2 去重 && 线流量处理
    result.edges = mergeLine(new_edges_list)
  } else {
    result.edges = origin_data.edges || []
  }
  console.log('result', result)
  return result
}

/** 解压数据
 * @param {Object} originData 实时数据
 *  originData:{ edges,nodes}, 必须的key，
 * edge.children 、node.versionList额外字段
 * @param {Array} unZipNode 单个数组
 */
export function unzipData(originData, unZipNode = []) {
  const origin_data = _.cloneDeep(originData) // 深拷贝问题
  console.log('unzip params:', origin_data, unZipNode[0])
  if (variableType(origin_data) !== 'object' || !origin_data) return origin_data
  if (variableType(unZipNode) === 'array') {
    if (unZipNode.length) {
      if (!unZipNode[0]) return origin_data
    } else {
      return origin_data
    }
  } else {
    return origin_data
  }

  const result = {}
  const node_list = origin_data && origin_data.nodes ? origin_data.nodes : []

  /** 1 节点释放（节点流量无需计算） */
  if (Array.isArray(node_list) && node_list.length) {
    const free_n_index = node_list.findIndex(node => node.id === unZipNode[0].id)
    // 1》判断解压的node是包含多个子节点 or 单节点
    if (free_n_index === -1 || !(node_list[free_n_index].versionList && node_list[free_n_index].versionList.length)) {
      // 无解压数据 || 单节点：无versionList：返回原数据----单节点无数据解压
      console.log('解压数据不存在 || 单节点不可解压')
      return origin_data
    }
    // 包含多子节点时
    const children_node_list = node_list[free_n_index].versionList // versionList中的node无versionList字段
    node_list.splice(free_n_index, 1) // 从源节点中删除释放的节点（服务级别）
    node_list.push(...children_node_list) // 合并释放的节点
    result.nodes = node_list
  } else {
    console.log('传参数据无节点信息')
    result.nodes = node_list
  }

  /** 2 释放line && 流量计算 */
  let edge_list = origin_data && origin_data.edges ? origin_data.edges : []
  if (Array.isArray(edge_list) && edge_list.length) {
    const children_line_list = [] // 包含起点、终点为解压node_id的需释放的line集合

    edge_list = edge_list.map((line) => {
      // 2-1 解压节点为连线的起点 =》判断起点为解压节点id的line是单连线还是已合并过
      if (unZipNode[0].id === line.source) {
        // 释放子line：单线条 or 已合并的line
        if (line.children && Array.isArray(line.children)) {
          if (line.children.length > 1) {
            for (let i = 0; i < line.children.length; i++) {
              const new_line = {} // 释放子节点=》新的起点的line
              new_line.source = line.children[i].source
              new_line.target = line.target // 终点不变
              new_line.traffics = line.children[i].traffics// 流量子line’的流量（子节点终点可能为合并后的，所以此处流量仅代表全展开数据中的流量处理了终点的来源）
              new_line.sourceOrigin = line.sourceOrigin
              new_line.targetOrigin = line.targetOrigin
              new_line.oldSource = line.children[i].source // 标记源起终点
              new_line.oldTarget = line.children[i].target
              children_line_list.push(new_line)
            }
          } else if (line.children.length === 1) {
            const new_line = {}
            new_line.source = line.children[0].source
            new_line.target = line.target
            new_line.traffics = line.children[0].traffics
            new_line.sourceOrigin = line.sourceOrigin
            new_line.targetOrigin = line.targetOrigin
            new_line.oldSource = line.children[0].source
            new_line.oldTarget = line.children[0].target
            children_line_list.push(new_line)
          } else {
            console.log('line.children.length = 0')
          }
        } else {
          console.log('无line.children字段')
        }
      }

      // 2-2 解压节点为连线的终点
      if (unZipNode[0].id === line.target) {
        if (line.children && Array.isArray(line.children)) {
          if (line.children.length > 1) {
          // 多线合并的line
            for (let i = 0; i < line.children.length; i++) {
              const new_line = {}
              new_line.source = line.source
              new_line.target = line.children[i].target
              new_line.traffics = line.children[i].traffics
              new_line.sourceOrigin = line.sourceOrigin
              new_line.targetOrigin = line.targetOrigin
              new_line.oldSource = line.children[i].source
              new_line.oldTarget = line.children[i].target
              children_line_list.push(new_line)
            }
          } else if (line.children.length === 1) {
            // 单线
            const new_line = {}
            new_line.source = line.source
            new_line.target = line.children[0].target
            new_line.traffics = line.children[0].traffics
            new_line.sourceOrigin = line.sourceOrigin
            new_line.targetOrigin = line.targetOrigin
            new_line.oldSource = line.children[0].source
            new_line.oldTarget = line.children[0].target
            children_line_list.push(new_line)
          }
        } else {
          console.log('无line.children字段')
        }
      }
      return line
    })
    // 释放出的子线条去重 && 计算流量：可能存在起点终点都是是合并节点且都有连线的情况
    const after_merge_line_list = mergeLine(children_line_list)
    // 移除起点为解压的节点的id:起点和终点都不为解压nodeid
    const new_line_list = edge_list.filter((line) => line.source !== unZipNode[0].id && line.target !== unZipNode[0].id)
    new_line_list.push(...after_merge_line_list)// 合并所有线条
    result.edges = new_line_list
    console.log('原line', ...edge_list)
    console.log('解压后cd_line ', ...after_merge_line_list)
    console.log('解压后new_line ', ...new_line_list)
  } else {
    console.log('传参数据无连线信息')
    result.edges = edge_list
  }
  console.log('result', result)
  return result
}
