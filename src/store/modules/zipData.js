/*
 * @Author: gezuxia
 * @Descripttion:
 * @Date: 2020-12-10 17:13:55
 * @LastEditors: gezuxia
 * @LastEditTime: 2020-12-14 15:05:50
 */
import { TP_DATA } from '@/utils/data' // mock数据
import { NodeModel } from '@/zip-data.js/data-model'
import _ from 'lodash'
import { zipData } from '@/utils/zip-data'

const state = {
  allUnzipData: {},
  allZipData: { // 全部压缩数据
    nodes: [],
    edges: []
  },
  nodeSourceMap: [], // 节点（版本）来源关系（服务级别）
  sameOriginObj: {} // 每个服务级别下的版本集合
}

const getters = {
}

const mutations = {
  // 设置全解压数据
  SET_ALL_UNZIP_DATA: (state, data) => {
    state.allUnzipData = data
  },
  // 设置全压缩数据
  SET_ALL_ZIP_DATA: (state, data) => {
    state.allZipData = data
  },
  // 设置版本节点与服务级别id对应关系表
  SET_NODE_SOURCE: (state, data) => {
    state.nodeSourceMap = data
  },
  // 设置每个服务级别下的版本集合
  SET_SAME_ALIAS_OBJ: (state, data) => {
    state.sameOriginObj = data
  }
}

const actions = {

  /**
   * 获取全解压数据
   * @param {*} param0
   * @param {*} userInfo
   */
  GetAllUnzipData({ state, commit }) {
    return new Promise((resolve, reject) => {
      /** 节点处理 */
      // 1. 注明每个节点-版本级别的来源----方便3根据节点某个字段来做分组处理
      const node_list = TP_DATA && TP_DATA.nodes ? TP_DATA.nodes.map(node => new NodeModel(node)) : []
      // 2. 各个节点（版本）的来源（服务级别） 的对应关系
      const map_list = new Map()
      map_list.set('default', 'null')
      TP_DATA.nodes.map(node => {
        map_list.set(node.id, `${node.namespace}/${node.name}`)
      })
      commit('SET_NODE_SOURCE', map_list)
      // 3. 节点：根据服务级别分组为相同服务级别的集合
      const same_alias_obj = _.groupBy(node_list, 'alias')
      commit('SET_SAME_ALIAS_OBJ', same_alias_obj)

      /** 线条数据处理 */
      const edges_list = TP_DATA && TP_DATA.edges ? TP_DATA.edges.map((line) => {
        line.sourceOrigin = map_list.get(line.source)
        line.targetOrigin = map_list.get(line.target)
        return line
      }) : []
      commit('SET_ALL_UNZIP_DATA', {
        nodes: node_list,
        edges: edges_list,
        nodeSourceMap: map_list,
        sameOriginNodes: same_alias_obj // 方便压缩数据时使用，避免每次压缩时都计算一次。
      })
      console.log('edges:', edges_list)

      /** 全压缩-初始化数据，必须是格式化源数据后*/
      const all_zip_data = zipData(state.allUnzipData)
      commit('SET_ALL_ZIP_DATA', all_zip_data)
      console.log('全压缩数据0:', state.allZipData)

      resolve(TP_DATA)
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
